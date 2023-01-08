import { createContext, useContext, useEffect, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

import { AccountContext } from './AccountProvider';

interface IWebSocketContext {
  socket: Socket;
}

const socket = io('http://localhost:3001', { autoConnect: false });

export const WebSocketContext = createContext<IWebSocketContext>({ socket });

export default function WebSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useContext(AccountContext);

  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (currentUser && !socketConnected) {
      socket.connect();
      socket.emit('connectToUser', { userId: currentUser.id });
      setSocketConnected(true);
    } else {
      setSocketConnected(false);
      if (socket.connected) socket.disconnect();
    }

    return () => {
      if (socket.connected) socket.disconnect();
    };
  }, [currentUser]);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
}
