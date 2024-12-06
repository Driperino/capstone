import { ActivityTimelineCard } from "@/components/cards/ActivityTimelineCard";
import { GamificationCard } from "@/components/cards/GamificationCard";
import { CarouselCard } from "@/components/cards/CarouselCard";
import { NotificationCard } from "@/components/cards/NotificationCard";

export default async function Dashboard() {
  return (
    <div className="p-4 grid gap-4 grid-cols-4 grid-rows-[auto_auto_auto_auto] h-full">
      {/* Notification Card */}
      <div className="sm-flex row-start-1 col-start-2 col-span-3">
        <NotificationCard />
      </div>
      {/* Gamification Station Card - Extending Vertically */}
      <div className="col-start-1 row-start-1 col-span-1 row-span-2 h-full">
        <GamificationCard />
      </div>
      {/* Carousel Card - Aligned to the Right */}
      <div className="sm-flex row-start-2 col-start-2 col-span-3">
        <CarouselCard />
      </div>
      {/* Activity Timeline Card */}
      <div className="sm-flex row-start-4 row-span-1 col-span-full">
        <ActivityTimelineCard />
      </div>
    </div>
  );
}
