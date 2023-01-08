import type { User } from 'types';

// This endpoint is idempotent, so it will create the user if necessary before returning
export async function getUser(username: string): Promise<User> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: username }),
  });
  return res.json();
}

export async function getUsers(username: string): Promise<User[]> {
  // TODO: We should pass the username in an auth token instead
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${username}`,
  );
  return res.json();
}
