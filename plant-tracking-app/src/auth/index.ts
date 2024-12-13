import NextAuth, { User, NextAuthConfig } from "next-auth";
import { providers } from "@/auth/providersConfig";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  providers: providers,
  basePath: BASE_PATH,
  secret: process.env.NEXT_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
