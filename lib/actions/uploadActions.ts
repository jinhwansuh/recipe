'use server';

import {
  uploadAuthorSchema,
  UploadAuthorValue,
} from '~/utils/validation/upload';
import { auth } from '~/auth';
import prisma from '~/lib/prisma';

export const createAuthor = async (data: UploadAuthorValue) => {
  const session = await auth();

  if (session?.user?.role !== 'ADMIN') {
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
