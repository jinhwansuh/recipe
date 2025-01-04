export type Role = 'USER' | 'TEST' | 'ADMIN';

export declare module 'next-auth' {
  interface Session {
    user: {
      role: Role;
      provider?: string;
    } & DefaultSession['user'];
  }

  interface AdapterUser {
    role: Role;
  }
}
