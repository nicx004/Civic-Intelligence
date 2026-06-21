import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

console.log("Google ID:", process.env.AUTH_GOOGLE_ID);
console.log("Google Secret exists:", !!process.env.AUTH_GOOGLE_SECRET);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  session: {
    strategy: "database",
  },

  secret: process.env.AUTH_SECRET,
});