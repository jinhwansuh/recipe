import { errorResponse } from '~/lib/http';
import prisma from '~/lib/prisma';
import { verifySession } from '~/lib/session';
import {
  uploadAuthorSchema,
  UploadAuthorValue,
} from '~/utils/validation/upload';

type Author = {
  id: string;
  name: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  youtubeUrl: string | null;
  youtubeId: string | null;
}[];

export type GetAuthorApi = Author;

export const GET = async () => {
  try {
    await verifySession();
    const authors = await prisma.author.findMany();
    return new Response(JSON.stringify(authors), {
      status: 200,
    });
  } catch (error: any) {
    return errorResponse(error);
  }
};

export const POST = async (request: Request) => {
  const res: UploadAuthorValue = await request.json();
  const parseData = uploadAuthorSchema.safeParse(res);

  if (!parseData.success) {
    return new Response(`${parseData.error.errors[0].message}`, {
      status: 400,
    });
  }

  try {
    await verifySession();

    await prisma.author.create({
      data: {
        name: parseData.data.name,
        youtubeUrl: parseData.data.youtubeUrl,
        imageUrl: parseData.data.imageUrl,
        youtubeId: parseData.data.youtubeId,
      },
    });
    return new Response(JSON.stringify({ code: 1 }), {
      status: 201,
    });
  } catch (error: any) {
    return errorResponse(error);
  }
};
