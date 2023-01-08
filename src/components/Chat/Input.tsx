import { useContext, useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import TextareaAutosize from 'react-textarea-autosize';

import { AccountContext, WebSocketContext } from 'providers';
import { ChatContext } from './context';

export default function Input() {
  const { currentUser } = useContext(AccountContext);
  const { socket } = useContext(WebSocketContext);
  const { currentRoom } = useContext(ChatContext);

  const [message, setMessage] = useState('');

  function handleEnterKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && e.shiftKey == false) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    if (!currentRoom || !currentUser) return;

    e?.preventDefault();
    socket.emit('sendMessage', {
      body: message,
      roomId: currentRoom,
      senderId: currentUser.id,
    });
    setMessage('');
  }

  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
      <TextareaAutosize
        className="textarea w-full resize-none"
        maxRows={3}
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleEnterKey}
      />
      <button
        className="flex h-12 w-12 items-center justify-center"
        disabled={!message || !currentRoom}
        type="submit"
      >
        <PaperAirplaneIcon
          className={`w-6 transition-colors 
            ${message && currentRoom ? 'text-sky-600' : 'text-slate-500'}`}
        />
      </button>
    </form>
  );
}
