'use server';

import prisma from '~/lib/prisma';

export const getManyRecipe = async () => {
  try {
    const response = await prisma.recipe.findMany({
      select: {
        id: true,
        title: true,
        thumbnailUrl: true,
        likes: true,
        tags: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return response;
  } catch (error: any) {
    throw new Error(error.message || 'server error');
  }
};
