import { providers } from "@/auth/providersConfig";
import { getUserByEmail, createUser, updateUser } from "./userUtils";

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
          await createUser(user);
        } else {
          await updateUser(user.email, {
            name: user.name,
            image: user.image,
            lastLogin: new Date(),
          });
        }

        return true;
      } catch (error) {
        console.error("Error creating or updating user:", error);
        return false;
      }
    },
    async session({ session }: any) {
      try {
        const userData = await getUserByEmail(session.user?.email);

        if (userData) {
          session.user.setupCompleted = userData.setup?.setupCompleted || false;
          session.user.earnedBadges = userData.earnedBadges || [];
          session.user.uploadedPlants = userData.uploadedPlants || 0;
          session.user.streakDays = userData.streakDays || 0;
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
