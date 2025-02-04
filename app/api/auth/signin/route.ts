import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { encrypt } from '~/lib/crypto';
import prisma from '~/lib/prisma';
import { signinSchema } from '~/utils/validation/user';
import { AuthSessionKey } from '~/constants/key';
import { TokenExpiredTime } from '~/constants/time';
import { ErrorResponse } from '../../lib/common';

export type UserSessionType = {
  name: string | null;
  id: string;
  email: string;
  image: string | null;
  role: string | null;
  provider: 'email';
};

export const POST = async (request: Request) => {
  const values = await request.json();

  const parsedData = signinSchema.safeParse(values);

  if (!parsedData.success) {
    return ErrorResponse(`Invalid identifier or password`, 400);
  }

  const userResponse = await prisma.user.findUnique({
    where: {
      email: values.email as string,
    },
  });

  if (!userResponse) {
    return ErrorResponse(`No user found`, 400);
  }

  const isPasswordMatch = bcrypt.compareSync(
    parsedData.data.password,
    userResponse?.password as string,
  );

  if (!isPasswordMatch) {
    return ErrorResponse(`Invalid password`, 400);
  }

  const expires = new Date(Date.now() + TokenExpiredTime);
  const user: UserSessionType = {
    name: userResponse.name,
    id: userResponse.id,
    email: userResponse.email,
    image: userResponse.image,
    role: userResponse.role,
    provider: 'email',
  };

  const session = await encrypt({ user, expires });
  const response = NextResponse.json(
    { code: 1 },
    {
      status: 200,
    },
  );

  response.cookies.set(AuthSessionKey, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });

  return response;
};
