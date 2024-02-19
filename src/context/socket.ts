//@ts-nocheck
import { io } from "socket.io-client";
import { createContext } from "react";
import { serverApi } from "../lib/config";

export const socket = io.connect(serverApi);
export const SocketContext = createContext();
