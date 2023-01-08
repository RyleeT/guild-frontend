import type { Room } from 'types';

import { useContext } from 'react';

import { AccountContext, WebSocketContext } from 'providers';
import { ChatContext } from './context';
import User from './User';

export default function UserList() {
  const { currentUser } = useContext(AccountContext);
  const { socket } = useContext(WebSocketContext);
  const { currentRoom, rooms, users, setCurrentRoom, setRooms } =
    useContext(ChatContext);

  async function createRoom(recipientId: string) {
    if (!currentUser) return;

    socket.emit(
      'createRoom',
      { senderId: currentUser.id, recipientId },
      (newRoom: Room) => {
        setCurrentRoom(newRoom.id);
        setRooms((existingRooms) => ({
          ...existingRooms,
          [newRoom.id]: newRoom,
        }));
      },
    );
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col gap-2 overflow-auto border-r border-zinc-700 p-2">
      {users.length > 0 ? (
        users.map(({ id, socketId, username }) => (
          <User
            active={!!rooms[currentRoom]?.users?.some((user) => user.id === id)}
            key={id}
            name={username}
            online={!!socketId}
            onClick={() => createRoom(id)}
          />
        ))
      ) : (
        <h3 className="text-center text-lg">No other users yet</h3>
      )}
    </aside>
  );
}
