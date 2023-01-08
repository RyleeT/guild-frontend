import type { Message, Room as RoomType, User } from 'types';

import { useContext, useEffect, useState } from 'react';
import { WebSocketContext } from 'providers';

import { ChatContext } from './context';
import Room from './Room';
import UserList from './UserList';

interface Props {
  initialState: {
    users: User[];
  };
}

export default function Chat({ initialState }: Props) {
  const { socket } = useContext(WebSocketContext);

  const [currentRoom, setCurrentRoom] = useState<string>('');
  const [rooms, setRooms] = useState<Record<string, RoomType>>({});
  const [users, setUsers] = useState(initialState.users);

  useEffect(() => {
    socket.on('message', (message: Message) => {
      setRooms((existingRooms) => ({
        ...existingRooms,
        [message.roomId]: {
          ...existingRooms[message.roomId],
          messages: [
            ...(existingRooms[message.roomId]?.messages || []),
            message,
          ],
        },
      }));
      console.info('New message: ', message);
    });

    socket.on('user', (user: User) => {
      setUsers((existingUsers) => {
        if (existingUsers.some((u) => u.id === user.id)) {
          return existingUsers.map((existingUser) =>
            existingUser.id === user.id ? user : existingUser,
          );
        } else {
          return [...existingUsers, user];
        }
      });
      console.info('A user logged in or out: ', user);
    });

    return () => {
      socket.off('message');
      socket.off('user');
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{
        currentRoom,
        rooms,
        users,
        setCurrentRoom,
        setRooms,
        setUsers,
      }}
    >
      <div className="flex flex-1">
        <UserList />
        <Room />
      </div>
    </ChatContext.Provider>
  );
}
