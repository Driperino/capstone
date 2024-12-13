import { ActivityTimelineCard } from "@/components/cards/ActivityTimelineCard";
import { GamificationCard } from "@/components/cards/GamificationCard";
import { CarouselCard } from "@/components/cards/CarouselCard";
import { NotificationCard } from "@/components/cards/NotificationCard";
import { getServerSession } from "next-auth/next";

export default async function Dashboard() {
  // Fetch the session on the server-side
  const session = await getServerSession();

  // Handle the case when there is no valid session (user is not authenticated)
  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Please log in to access your dashboard.</p>
      </div>
    );
  }

  // Extract user email from session
  const userEmail = session.user.email || "";

  return (
    <div className="p-4 grid gap-4 grid-cols-4 grid-rows-[auto_auto_auto_auto] h-full">
      {/* Notification Card */}
      <div className="sm-flex row-start-1 col-start-2 col-span-3">
        <NotificationCard />
      </div>
      {/* Gamification Station Card - Extending Vertically */}
      <div className="col-start-1 row-start-1 col-span-1 row-span-2 h-full">
        <GamificationCard userEmail={userEmail} />
      </div>
      {/* Carousel Card - Aligned to the Right */}
      <div className="sm-flex row-start-2 col-start-2 col-span-3">
        <CarouselCard />
      </div>
      {/* Activity Timeline Card */}
      <div className="sm-flex row-start-4 row-span-1 col-span-full">
        <ActivityTimelineCard userEmail={userEmail} />
      </div>
    </div>
  );
}
