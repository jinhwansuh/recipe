import prisma from '~/lib/prisma';
import { verifySession } from '~/lib/session';
import {
  uploadRecipeSchema,
  UploadRecipeValue,
} from '~/utils/validation/upload';

export const GET = async () => {};

export const POST = async (request: Request) => {
  const res: UploadRecipeValue = await request.json();
  const parseData = uploadRecipeSchema.safeParse(res);

  if (!parseData.success) {
    return new Response(`${parseData.error.errors[0].message}`, {
      status: 400,
    });
  }

  try {
    const session = await verifySession();

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
    return new Response(JSON.stringify({ code: 1 }), {
      status: 201,
    });
  } catch (error: any) {
    return new Response(`${error.message || 'server error'}`, { status: 500 });
  }
};
