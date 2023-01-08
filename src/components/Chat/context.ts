import type { Room, User } from 'types';
import { type Dispatch, type SetStateAction, createContext } from 'react';

interface IChatContext {
  currentRoom: string;
  rooms: Record<string, Room>;
  users: User[];
  setCurrentRoom: Dispatch<SetStateAction<string>>;
  setRooms: Dispatch<SetStateAction<Record<string, Room>>>;
  setUsers: Dispatch<SetStateAction<User[]>>;
}

export const ChatContext = createContext<IChatContext>({
  currentRoom: '',
  rooms: {},
  users: [],
  setCurrentRoom: () => {},
  setRooms: () => {},
  setUsers: () => {},
});
