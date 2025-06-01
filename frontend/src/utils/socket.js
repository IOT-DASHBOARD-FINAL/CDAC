import { io } from "socket.io-client";
import getBackendUrl from "./checkBackend";

const getSocketServerUrl = async () => {
    return await getBackendUrl();
};

const SOCKET_SERVER_URL = await getSocketServerUrl();

const socket = io(SOCKET_SERVER_URL, {
    autoConnect: true,
    reconnection: true,
    transports: ['websocket', 'polling']
});

socket.on('connect', () => {
    console.log('Connected to server:', socket.id);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

export default socket;