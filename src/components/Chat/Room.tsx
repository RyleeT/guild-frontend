import { useContext } from 'react';
import Image from 'next/image';

import { ChatContext } from './context';
import Input from './Input';
import MessageList from './MessageList';

export default function Room() {
  const { currentRoom } = useContext(ChatContext);

  return currentRoom ? (
    <div className="flex flex-1 flex-col gap-4 px-4 pb-4">
      <MessageList />
      <Input />
    </div>
  ) : (
    <div className="flex flex-1 flex-col justify-center">
      <div className="relative h-96 w-auto">
        <Image
          alt="Select conversation"
          fill
          priority
          src="/select_message.svg"
        />
      </div>
      <h2 className="text-center text-2xl">Please select a conversation</h2>
    </div>
  );
}
