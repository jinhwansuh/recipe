'use server';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { cache } from 'react';
import { AuthSessionKey, EntryUserKey } from '~/constants/key';
import { TokenExpiredTime } from '~/constants/time';
import { UserSessionType } from '~/app/api/auth/signin/route';
import { decrypt, encrypt } from './crypto';
import { CustomError } from './error';
import prisma from './prisma';

export const createSession = async (request: NextRequest) => {
  const session = request.cookies.get(AuthSessionKey)?.value;
  const response = NextResponse.next();
  if (!session) {
    response.cookies.set({
      name: EntryUserKey,
      value: 'on',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return response;
  }

  const parsedSession = (await decrypt(session)) as UserSessionType;

  const userResponse = await prisma.user.findUnique({
    where: {
      id: parsedSession.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  });
  if (!userResponse) {
    response.cookies.set({
      name: EntryUserKey,
      value: 'on',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return response;
  }

  const user: any = {
    ...userResponse,
    provider: 'email',
  };
  const expiresAt = new Date(Date.now() + TokenExpiredTime);
  user.expires = expiresAt;
  response.cookies.set({
    name: EntryUserKey,
    value: 'on',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  response.cookies.set({
    name: AuthSessionKey,
    value: await encrypt(user),
    httpOnly: true,
    expires: user.expires as Date,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return response;
};

export const updateSession = async (request: NextRequest) => {
  const session = request.cookies.get(AuthSessionKey)?.value;
  if (!session) return null;

  const parsedSession = await decrypt(session);

  if (!parsedSession) {
    return null;
  }
  parsedSession.expires = new Date(Date.now() + TokenExpiredTime);
  const response = NextResponse.next();
  response.cookies.set({
    name: AuthSessionKey,
    value: await encrypt(parsedSession),
    httpOnly: true,
    expires: parsedSession.expires as Date,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  return response;
};

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get(AuthSessionKey)?.value;

  if (!cookie) {
    throw new CustomError('not authorized', 401);
  }
  const session = await decrypt(cookie);

  if (!session) {
    throw new CustomError('not authorized', 401);
  }

  return { isAuth: true, user: session as UserSessionType };
});

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(AuthSessionKey);
};

export const getUser = cache(async () => {
  try {
    const session = await verifySession();
    if (!session) return null;
    return session;
  } catch {
    return null;
  }
});
