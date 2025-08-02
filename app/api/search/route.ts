import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '~/lib/prisma';
import { searchSchema } from '~/utils/validation/search';
import { STATUS_CODE } from '~/constants/api';
import { SearchQueryKey, SearchTabKey, SearchTabValue } from '~/constants/key';
import { ErrorResponse } from '../lib/common';
import { Author, authorInclude, Recipe, recipeSelect } from '../main/route';

export type Ingredient = Prisma.RecipeGetPayload<object>;

export type GetSearchApi = Array<Recipe | Author | Ingredient>;

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;
  const searchQuery = params.get(SearchQueryKey);

  if (!searchQuery) {
    return NextResponse.json([]);
  }

  const searchTarget = params.get(SearchTabKey);
  const parseData = searchSchema.safeParse({
    [SearchQueryKey]: searchQuery,
    [SearchTabKey]: searchTarget ?? SearchTabValue.TITLE,
  });

  if (!parseData.success) {
    return NextResponse.json(parseData.error.errors[0].message, {
      status: STATUS_CODE.BAD_REQUEST,
    });
  }

  const data = parseData.data;

  try {
    let response: GetSearchApi | [];

    if (
      data[SearchTabKey] === undefined ||
      data[SearchTabKey] === SearchTabValue.TITLE
    ) {
      response = await prisma.recipe.findMany({
        where: {
          title: {
            contains: data[SearchQueryKey],
          },
        },
        select: recipeSelect,
      });
    } else if (data[SearchTabKey] === SearchTabValue.AUTHOR) {
      response = await prisma.author.findMany({
        where: {
          name: {
            contains: data[SearchQueryKey],
          },
        },
        include: authorInclude,
      });
    } else if (data[SearchTabKey] === SearchTabValue.INGREDIENT) {
      response = await prisma.recipe.findMany({
        where: {
          ingredients: {
            array_contains: [{ name: data[SearchQueryKey] }],
          },
        },
      });
    } else {
      response = [];
    }

    return NextResponse.json(response);
  } catch (error: any) {
    return ErrorResponse(error.message, error.status);
  }
};
