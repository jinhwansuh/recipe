'use server';

import { after } from 'next/server';
import prisma from '~/lib/prisma';

export const getMainPageRecipe = async () => {
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

export const getRecipe = async (recipeId: string) => {
  try {
    const response = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    after(async () => {
      if (!response) return;
      if (process.env.NODE_ENV === 'development') return;
      await prisma.recipe.update({
        where: { id: recipeId },
        data: { viewCount: { increment: 1 } },
      });
    });
    return response;
  } catch (error: any) {
    throw new Error(error.message || 'server error');
  }
};
