import type { User } from 'types';

import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useContext, useEffect } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';

import { getUser, getUsers } from 'api';
import { Chat, LogoutButton } from 'components';
import { AccountContext } from 'providers';

interface Props {
  user: User;
  users: User[];
}

export default function Home({ user, users }: Props) {
  const { currentUser, setCurrentUser } = useContext(AccountContext);

  // If we get redirected here from login, we must set currentUser from SSR
  useEffect(() => {
    if (!currentUser) setCurrentUser(user);
  }, []);

  return (
    <>
      <Head>
        <title>Guild</title>
      </Head>
      <main className="flex flex-1">
        <LogoutButton className="absolute right-4 top-4 z-50" />
        <Chat initialState={{ users }} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
}) => {
  const username = getCookie('username', { req, res });

  // If user does not have an auth cookie, redirect them to the login page
  if (!username) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  try {
    // Prepopulate users
    const [user, users] = await Promise.all([
      getUser(username as string),
      getUsers(username as string),
    ]);

    return { props: { user, users } };
  } catch (error) {
    // Get rid of pseudo-auth token and redirect to login if we have an issue loading users
    deleteCookie('username', { req, res });
    console.error('Could not load user information');

    return { redirect: { destination: '/login', permanent: false } };
  }
};
