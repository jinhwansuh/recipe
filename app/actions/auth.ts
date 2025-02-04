import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import prisma from '~/lib/prisma';
import { deleteSession } from '~/lib/session';
import { signupSchema, SignupValue } from '~/utils/validation/user';

export type SignInType = 'email';

export async function signOut() {
  deleteSession();
  revalidatePath('/');
  redirect('/');
}

export const signUpUser = async (data: SignupValue) => {
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

export const signIn = async (formData) => {
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

  const expires = new Date(Date.now() + 1);
  const user: UserSessionType = {
    name: userResponse.name,
    id: userResponse.id,
    email: userResponse.email,
    image: userResponse.image,
    role: userResponse.role,
    provider: 'email',
  };
  const session = await encrypt({ user, expires });
  // const cookieStore = await cookies();
  // cookieStore.set(AuthSessionKey, session, {
  //   httpOnly: true,
  //   secure: true,
  //   expires: expires,
  //   sameSite: 'lax',
  //   path: '/',
  // });
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
