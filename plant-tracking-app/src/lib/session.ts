import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth/authOptions";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
}
