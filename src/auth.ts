import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID!,
    clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    authorization: {
      params: {
        prompt: "select_account",
      },
    },
  })
  ],

  session: {
    strategy: "database",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("=== GOOGLE SIGN IN ===");
      console.log("USER:", {
        id: user.id,
        email: user.email,
        name: user.name,
      });
      console.log("ACCOUNT:", {
        provider: account?.provider,
        providerAccountId: account?.providerAccountId,
      });
      console.log("PROFILE:", {
        email: profile?.email,
        name: profile?.name,
      });

      return true;
    },

    async session({ session, user }) {
      console.log("=== AUTH SESSION ===");
      console.log("SESSION USER:", {
        id: user.id,
        email: user.email,
        name: user.name,
      });

      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }

      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
});