import { io } from 'socket.io-client';


const initSocket = async () => {
    const options = {
        forceNew: true,                  // Corrected key
        reconnectionAttempts: 'Infinity', // Corrected key
        timeout: 10000,
        transports: ['websocket'],
    };
    return io('https://livescript-backend.onrender.com', options);
};

export default initSocket;
