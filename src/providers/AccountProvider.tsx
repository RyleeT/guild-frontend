import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
} from 'react';

import type { User } from 'types';

interface IAccountContext {
  currentUser?: User;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
}

export const AccountContext = createContext<IAccountContext>({
  currentUser: undefined,
  setCurrentUser: () => {},
});

interface Props {
  children: React.ReactNode;
  user?: User;
}

export default function AccountProvider({ children, user }: Props) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(user);

  return (
    <AccountContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AccountContext.Provider>
  );
}
