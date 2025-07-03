// import { createContext, useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';

// export const SocketContext = createContext();

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const socketRef = useRef(null); // keep a stable reference across re-renders

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000', {
//       withCredentials: true,
//       autoConnect: false,
//     });

//     socketRef.current = newSocket;
//     setSocket(newSocket);

//     const token = localStorage.getItem('token');
//     if (token) {
//       newSocket.auth = { token };
//       newSocket.connect();
//     }

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   // Listen to token changes across tabs and reconnect/disconnect
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'token') {
//         const token = e.newValue;

//         if (token && socketRef.current && !socketRef.current.connected) {
//           socketRef.current.auth = { token };
//           socketRef.current.connect();
//         } else if (!token && socketRef.current?.connected) {
//           socketRef.current.disconnect();
//         }
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

import { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null); // keep a stable reference across re-renders

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      withCredentials: true,
      autoConnect: false,
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    const token = localStorage.getItem('token');
    if (token) {
      newSocket.auth = { token };
      newSocket.connect();
    }

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Listen to token changes across tabs and reconnect/disconnect
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        const token = e.newValue;

        if (token && socketRef.current && !socketRef.current.connected) {
          socketRef.current.auth = { token };
          socketRef.current.connect();
        } else if (!token && socketRef.current?.connected) {
          socketRef.current.disconnect();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
