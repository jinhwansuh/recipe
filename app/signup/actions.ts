'use server';

import bcrypt from 'bcryptjs';
import { signupSchema, SignupValue } from '~/utils/validation/user';
import prisma from '~/lib/prisma';

export const createUser = async (data: SignupValue) => {
  const parsedData = signupSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error(parsedData.error.errors[0].message);
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
    throw new Error('server error');
  }
};
