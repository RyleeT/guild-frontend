import { useContext } from 'react';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { AccountContext } from 'providers';

interface Props {
  className?: string;
}

export default function LogoutButton({ className }: Props) {
  const router = useRouter();
  const { setCurrentUser } = useContext(AccountContext);

  /** Remove our pseudo-auth token, clear account context, and return to login page */
  function logout() {
    deleteCookie('username');
    setCurrentUser(undefined);
    router.push('/login');
  }

  return (
    <button
      className={`btn-outline btn-circle btn ${className}`}
      onClick={logout}
    >
      <XMarkIcon className="w-6" />
    </button>
  );
}
