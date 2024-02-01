import { io } from "socket.io-client";
import { serverApi } from "../../lib/config";
import  { createContext } from "react";

export const socket = io.connect(serverApi);
export const SocketContext = createContext();