import { NextResponse } from 'next/server';
import prisma from '~/lib/prisma';
import { ErrorResponse } from '../lib/common';

export type Recipe = {
  id: string;
  title: string;
  tags: string[];
  thumbnailUrl: string | null;
  viewCount: number;
  author: {
    name: string;
  };
  _count: {
    likes: number;
  };
};

export type Author = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  youtubeUrl: string | null;
  name: string;
  imageUrl: string | null;
  youtubeId: string | null;
  _count: {
    Recipe: number;
  };
};

export type GetMainApi = {
  recipes: Array<Recipe>;
  authors: Array<Author>;
};

export const GET = async () => {
  try {
    const recipes: Array<Recipe> = await prisma.recipe.findMany({
      select: {
        id: true,
        title: true,
        thumbnailUrl: true,
        tags: true,
        viewCount: true,
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
      take: 5,
    });
    const authors: Array<Author> = await prisma.author.findMany({
      include: {
        _count: {
          select: {
            Recipe: true,
          },
        },
      },
      take: 6,
    });

    return NextResponse.json({ recipes, authors });
  } catch (error: any) {
    return ErrorResponse(error.message, error.status);
  }
};
