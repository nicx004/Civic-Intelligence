import { DefaultSession } from "next-auth";
import "next-auth";
import "next-auth/adapters";

type UserRole = "USER" | "MODERATOR" | "ADMIN";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    role: UserRole;
  }
}