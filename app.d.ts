// types/next-auth.d.ts

import NextAuth from 'next-auth';
import { DefaultUser, DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession['user'];
  }

  interface User {
    role?: string;
  }
}
