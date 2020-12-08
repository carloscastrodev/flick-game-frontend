import React from "react";
import SocketIOService from "../services/SocketIOService";
import io from "socket.io-client";

const IOService = new SocketIOService(io);

export const IOContext: React.Context<SocketIOService> = React.createContext<SocketIOService>(
  IOService
);

const { Provider } = IOContext;

export const IOProvider: React.FC = ({ children }) => {
  return <Provider value={IOService}>{children}</Provider>;
};
