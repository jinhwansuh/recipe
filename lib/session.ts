import { cache } from 'react';
import { auth } from '~/auth';

export const verifySession = cache(async () => {
  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('not authorized');
  }

  return session;
});
