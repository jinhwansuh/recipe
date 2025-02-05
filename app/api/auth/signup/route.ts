import bcrypt from 'bcryptjs';
import prisma from '~/lib/prisma';
import { signupSchema } from '~/utils/validation/user';
import { ErrorResponse } from '../../lib/common';

export const POST = async (request: Request) => {
  const data = await request.json();

  const parsedData = signupSchema.safeParse(data);

  if (!parsedData.success) {
    throw ErrorResponse(parsedData.error.errors[0].message, 400);
  }

  const isExistEmail = await prisma.user.findUnique({
    where: {
      email: parsedData.data.email,
    },
  });
  if (!!isExistEmail) {
    return ErrorResponse('Email already exists', 400);
  }

  try {
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 12);
    await prisma.user.create({
      data: {
        name: parsedData.data.username,
        email: parsedData.data.email,
        password: hashedPassword,
      },
    });
    return new Response(JSON.stringify({ code: 1 }), {
      status: 201,
    });
  } catch (error: any) {
    return ErrorResponse(error.message || 'server error', 500);
  }
};
