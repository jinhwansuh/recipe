import { cache } from 'react';
import { auth } from '~/auth';

class AuthorizedError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export const verifySession = cache(async () => {
  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    throw new AuthorizedError('not authorized', 401);
  }

  return session;
});
