/* eslint-disable import/prefer-default-export */
import axios from "axios";
import io from "socket.io-client";
import { apiUrl } from "./config";
import { getRoom, getUserInfo } from "./localStorage";

export const socket = io("http://localhost:5000");

export const getUserById = async (id) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
export const signin = async ({ email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/signin`,
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/register`,
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        name,
        email,
        password,
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
export const updateUser = async ({ name, email, password }) => {
  try {
    const { _id, token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/users/${_id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        email,
        password,
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
export const connect = () => {
  socket.emit("new user joined", { user: getUserInfo(), room: getRoom() });
};
export const sendMoveToServer = async (
  turn,
  roomToSend,
  movedPiece,
  pickInfo,
  moveType
) => {
  let nextToMove;
  if (turn === "White") {
    nextToMove = "Black";
  } else {
    nextToMove = "White";
  }
  socket.emit("sendMove", {
    turn: nextToMove,
    room: roomToSend,
    piece: movedPiece,
    position: pickInfo.pickedMesh.position,
    type: moveType,
  });
};
