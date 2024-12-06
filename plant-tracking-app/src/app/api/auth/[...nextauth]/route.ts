import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import { MongoClient, Db } from "mongodb";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Redirect to dashboard after login
      if (url === "/api/auth/signin") {
        return `${baseUrl}/protected/dashboard`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async signIn({
      user,
    }: {
      user: { name?: string; email?: string; image?: string };
    }) {
      try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db(process.env.DB_NAME || "leafmatrix");

        // Check if user already exists
        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });

        if (!existingUser) {
          // Create a new user if they don't exist
          await db.collection("users").insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            createdAt: new Date(),
            setup: {
              setupCompleted: false, // Default value for setup status
            },
            earnedBadges: [], // New field to store earned badges
            uploadedPlants: 0, // New field for number of uploaded plants
            streakDays: 0, // New field for streak days
          });
        } else {
          // Optionally update user data if needed
          await db.collection("users").updateOne(
            { email: user.email },
            {
              $set: {
                name: user.name,
                image: user.image,
                lastLogin: new Date(),
              },
            }
          );
        }

        return true;
      } catch (error) {
        console.error("Error creating or updating user:", error);
        return false;
      }
    },
    async session({ session, user }: any) {
      // Add setup information to the session
      const client: MongoClient = await clientPromise;
      const db: Db = client.db(process.env.DB_NAME || "leafmatrix");
      const userData = await db
        .collection("users")
        .findOne({ email: session.user?.email });

      if (userData?.setup?.setupCompleted) {
        session.user.setupCompleted = userData.setup.setupCompleted;
      } else {
        session.user.setupCompleted = false;
      }

      // Add new fields to session
      session.user.earnedBadges = userData?.earnedBadges || [];
      session.user.uploadedPlants = userData?.uploadedPlants || 0;
      session.user.streakDays = userData?.streakDays || 0;

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
