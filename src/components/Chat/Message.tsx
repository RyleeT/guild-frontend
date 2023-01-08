interface Props {
  children: React.ReactNode;
  className?: string;
  isSender: boolean;
}

export default function Message({ children, className, isSender }: Props) {
  return (
    <div
      className={`chat ${isSender ? 'chat-end' : 'chat-start'} ${className}`}
    >
      <div
        className={`chat-bubble whitespace-pre-wrap break-words text-primary-content
          ${isSender ? 'bg-sky-600' : 'bg-base-100'}`}
      >
        {children}
      </div>
    </div>
  );
}
