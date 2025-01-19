'use server';

import prisma from '~/lib/prisma';

export const getManyAuthor = async () => {
  try {
    const response = await prisma.author.findMany();
    return response;
  } catch (error: any) {
    throw new Error(error.message || 'server error');
  }
};
