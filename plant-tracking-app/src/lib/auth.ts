import type { NextAuthOptions } from "next-auth";
import providers from "@/auth/providersConfig";

export const authOptions: NextAuthOptions = {
  providers: providers,
  session: {
    strategy: "jwt",
  },
};
