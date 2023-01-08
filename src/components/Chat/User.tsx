interface Props {
  active: boolean;
  name: string;
  onClick?: React.MouseEventHandler;
  online: boolean;
}

export default function User({ active, name, onClick, online }: Props) {
  const initial = name.charAt(0);

  return (
    <div
      className={`flex cursor-pointer items-center gap-4 rounded-md p-1
        ${active ? 'bg-zinc-700' : 'bg-transparent hover:bg-zinc-800'}`}
      onClick={onClick}
    >
      <div className={`placeholder avatar ${online ? 'online' : 'offline'}`}>
        <div className="w-16 rounded-full bg-base-100">
          <span className="text-2xl uppercase">{initial}</span>
        </div>
      </div>

      <span className="truncate text-lg font-semibold">{name}</span>
    </div>
  );
}
