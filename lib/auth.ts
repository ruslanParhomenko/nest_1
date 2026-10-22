import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ADMIN_EMAIL = process.env.ADMIN_GMAIL;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  pages: {
    signIn: "/",
    signOut: "/",
    error: "/no-access",
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const isAdmin = profile.email === ADMIN_EMAIL;
        token.role = isAdmin ? "admin" : undefined;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub!;
      session.user.role = token.role as string | undefined;
      return session;
    },

    async signIn({ account, profile }) {
      if (account && profile) {
        const isAdmin = profile.email === ADMIN_EMAIL;
        return isAdmin;
      }
      return false;
    },
  },
};
