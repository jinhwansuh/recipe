import prisma from '~/lib/prisma';

export type Recipe = {
  id: string;
  title: string;
  tags: string[];
  thumbnailUrl: string | null;
  author: {
    name: string;
  };
  _count: {
    likes: number;
  };
}[];

export type Author = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  youtubeUrl: string | null;
  name: string;
  imageUrl: string | null;
  youtubeId: string | null;
}[];

export type GetMainApi = {
  recipes: Recipe;
  authors: Author;
};

export const GET = async () => {
  try {
    const recipes: Recipe = await prisma.recipe.findMany({
      select: {
        id: true,
        title: true,
        thumbnailUrl: true,

        tags: true,
        author: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    const authors: Author = await prisma.author.findMany();

    return new Response(JSON.stringify({ recipes, authors }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(`${error.message || 'server error'}`, { status: 500 });
  }
};
