import { useContext } from 'react';
import Image from 'next/image';

import { AccountContext } from 'providers';
import { ChatContext } from './context';
import Message from './Message';

export default function MessageList() {
  const { currentUser } = useContext(AccountContext);
  const { currentRoom, rooms } = useContext(ChatContext);

  return rooms[currentRoom]?.messages?.length ? (
    <div className="flex flex-1 basis-0 flex-col overflow-y-auto pt-4">
      {rooms[currentRoom]?.messages?.map(({ body, id, senderId }) => (
        <Message
          className="first:mt-auto"
          isSender={currentUser?.id === senderId}
          key={id}
        >
          {body}
        </Message>
      ))}
    </div>
  ) : (
    <div className="flex flex-1 flex-col justify-center">
      <div className="relative h-96 w-auto">
        <Image alt="No messages" fill priority src="/empty.svg" />
      </div>
      <h2 className="text-center text-2xl">No messages yet</h2>
    </div>
  );
}
