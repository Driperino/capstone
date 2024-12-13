import { providers } from "@/auth/providersConfig";
import {
  getUserById,
  getUserByEmail,
  createUser,
  updateUserById,
} from "./userUtils";
import { ExtendedSessionUser } from "@/types/types"; // Centralized type for session user

export const authOptions = {
  providers,
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
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
        const existingUser = await getUserByEmail(user.email);

        if (!existingUser) {
          const newUser = await createUser(user);
          return !!newUser;
        } else {
          await updateUserById(existingUser._id, {
            name: user.name,
            image: user.image,
            lastLogin: new Date(),
          });
          return true;
        }
      } catch (error) {
        console.error("Error creating or updating user:", error);
        return false;
      }
    },

    async session({ session }: { session: any }) {
      try {
        const userData = await getUserByEmail(session.user?.email);

        if (userData) {
          // Add additional fields to the session user
          const sessionUser: ExtendedSessionUser = {
            id: userData._id.toString(),
            name: userData.name || "",
            email: userData.email || "",
            image: userData.image || "",
            setupCompleted: userData.setup?.setupCompleted || false,
            earnedBadges: userData.earnedBadges || [],
            uploadedPlants: userData.uploadedPlants || 0,
            streakDays: userData.streakDays || 0,
          };

          session.user = sessionUser; // Attach extended user object to the session
        }
      } catch (error) {
        console.error(
          "Error fetching user data during session callback:",
          error
        );
      }

      return session;
    },
  },
};
