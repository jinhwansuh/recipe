'use server';

import prisma from '~/lib/prisma';
import {
  uploadAuthorSchema,
  UploadAuthorValue,
  uploadRecipeSchema,
  UploadRecipeValue,
} from '~/utils/validation/upload';
import { auth } from '~/auth';

export const createAuthor = async (data: UploadAuthorValue) => {
  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('not authorized');
  }

  const parseData = uploadAuthorSchema.safeParse(data);

  if (!parseData.success) {
    throw new Error(parseData.error.errors[0].message);
  }

  try {
    await prisma.author.create({
      data: {
        name: parseData.data.name,
        youtubeUrl: parseData.data.youtubeUrl,
        imageUrl: parseData.data.imageUrl,
        youtubeId: parseData.data.youtubeId,
      },
    });
  } catch (error: any) {
    throw new Error(error.message || 'server error');
  }
};

export const createRecipe = async (data: UploadRecipeValue) => {
  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('not authorized');
  }

  const parseData = uploadRecipeSchema.safeParse(data);

  if (!parseData.success) {
    throw new Error(parseData.error.errors[0].message);
  }

  try {
    await prisma.recipe.create({
      data: {
        title: parseData.data.title,
        tags: parseData.data.tags.split(',').map((el) => el.trim()),
        serving: parseData.data.serving,
        thumbnailUrl: parseData.data.imageUrl,
        ingredients: parseData.data.ingredients,
        youtubeUrl: parseData.data.videoUrl,
        steps: parseData.data.steps.map((step) => step.description),
        authorID: parseData.data.recipeAuthor,
        userId: session.user.id,
      },
    });
  } catch (error: any) {
    throw new Error(error.message || 'server error');
  }
};

export const getAuthors = async () => {
  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('not authorized');
  }

  try {
    const authors = await prisma.author.findMany();
    return authors;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch users');
  }
};
