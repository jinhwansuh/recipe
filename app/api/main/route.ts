import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '~/lib/prisma';
import { ErrorResponse } from '../lib/common';

const recipeSelect = {
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
} as const;

const authorInclude = {
  _count: {
    select: {
      Recipe: true,
    },
  },
} as const;

export type Recipe = Prisma.RecipeGetPayload<{ select: typeof recipeSelect }>;
export type Author = Prisma.AuthorGetPayload<{ include: typeof authorInclude }>;

export type GetMainApi = {
  recipes: Array<Recipe>;
  authors: Array<Author>;
};

export const GET = async () => {
  try {
    const recipes: Array<Recipe> = await prisma.recipe.findMany({
      select: recipeSelect,
      take: 5,
    });
    const authors: Array<Author> = await prisma.author.findMany({
      include: authorInclude,
      take: 6,
    });

    return NextResponse.json({ recipes, authors });
  } catch (error: any) {
    return ErrorResponse(error.message, error.status);
  }
};
