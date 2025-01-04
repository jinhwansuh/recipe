'use server';

import { revalidatePath } from 'next/cache';
import { signOut as nextAuthSignOut } from '~/auth';

export const signOut = async () => {
  console.log('signOut');
  await nextAuthSignOut();
  revalidatePath('/');
};
