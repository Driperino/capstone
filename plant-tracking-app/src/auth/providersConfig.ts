import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const providers = [
  GithubProvider({
    clientId: process.env.GITHUB_ID || "",
    clientSecret: process.env.GITHUB_SECRET || "",
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_ID || "",
    clientSecret: process.env.GOOGLE_SECRET || "",
  }),
  credentials({
    name: "Credentials",
    id: "credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      await connectDB();
      const user = await User.findOne({
        email: credentials?.email,
      }).select("+password");
      if (!user) throw new Error("Wrong Email");
      const passwordMatch = await bcrypt.compare(
        credentials!.password,
        user.password
      );
      if (!passwordMatch) throw new Error("Wrong Password");
      return user;
    },
  }),
];
