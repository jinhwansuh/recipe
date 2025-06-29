import { NextRequest, NextResponse } from 'next/server';
import prisma from '~/lib/prisma';
import { searchSchema } from '~/utils/validation/search';
import { STATUS_CODE } from '~/constants/api';
import { SearchQueryKey, SearchTargetKey } from '~/constants/key';
import { ErrorResponse } from '../lib/common';

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;
  const searchQuery = params.get(SearchQueryKey);
  const searchTarget = params.get(SearchTargetKey);
  const parseData = searchSchema.safeParse({
    [SearchQueryKey]: searchQuery,
    [SearchTargetKey]: searchTarget ?? undefined,
  });

  if (!parseData.success) {
    return NextResponse.json(parseData.error.errors[0].message, {
      status: STATUS_CODE.BAD_REQUEST,
    });
  }

  const data = parseData.data;

  try {
    const response = await prisma.recipe.findMany({
      where: {
        title: {
          contains: data[SearchQueryKey],
        },
      },
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
        author: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    return NextResponse.json(response);
  } catch (error: any) {
    return ErrorResponse(error.message, error.status);
  }
};
