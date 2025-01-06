import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import prisma from '~/lib/prisma';
import { MONTH } from './constants/time';

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password';
}
class NoUserFound extends CredentialsSignin {
  code = 'No user found';
}
class PasswordError extends CredentialsSignin {
  code = 'Invalid password';
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 1 * MONTH({ base: 's' }),
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new InvalidLoginError();
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });
        if (!user) {
          throw new NoUserFound();
        }

        const isPasswordMatch = bcrypt.compareSync(
          credentials.password as string,
          user?.password as string,
        );
        if (!isPasswordMatch) {
          throw new PasswordError();
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  callbacks: {
    jwt({ token, user, account }) {
      if (user) {
        token.user = {
          name: user.name,
          id: user.id,
          email: user.email,
          image: user.image,
          // @ts-ignore
          role: user.role,
          provider: account?.provider,
        };
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  debug: process.env.NODE_ENV !== 'production',
});
