import { type FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { getCookie, setCookie } from 'cookies-next';

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState('');

  /** Save username in cookie as pseudo-auth token and assume authentication */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCookie('username', username);
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Login - Guild</title>
      </Head>
      <main className="flex flex-1 items-center justify-center">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="relative mb-12 h-16 w-60">
            <Image
              alt="Guild Education logo"
              className="object-contain"
              fill
              priority
              sizes="15rem"
              src="/guild_white.png"
            />
          </div>
          <input
            className="input mb-4"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <button
            className="btn-outline btn"
            disabled={!username}
            type="submit"
          >
            Sign In
          </button>
        </form>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const username = getCookie('username', { req, res });

  // User already has one of our pseudo-auth tokens, send them to the home page
  if (username) {
    return { redirect: { destination: '/', permanent: false } };
  }

  return { props: {} };
};
