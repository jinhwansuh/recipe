'use server';

import bcrypt from 'bcryptjs';
import { signupSchema, SignupValue } from '~/utils/validation/user';
import prisma from '~/lib/prisma';

export const createUser = async (data: SignupValue) => {
  const parsedData = signupSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error(parsedData.error.errors[0].message);
  }

  const isExistEmail = await prisma.user.findUnique({
    where: {
      email: parsedData.data.email,
    },
  });
  if (!!isExistEmail) {
    throw new Error('Email already exists');
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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('server error');
  }
};
