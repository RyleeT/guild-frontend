// TODO: These should be autogenerated based on the schema

export type Message = {
  id: string;
  body: string;
  roomId: string;
  senderId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Room = {
  id: string;
  messages?: Message[];
  users?: User[];
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  username: string;
  socketId: string;
  messages?: Message[];
  rooms?: Room[];
  createdAt: Date;
  updatedAt: Date;
};
