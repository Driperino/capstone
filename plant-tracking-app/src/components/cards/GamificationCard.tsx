import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MotionGrowAndFloat from "@/components/animation/MotionGrowAndFloat";

export const GamificationCard = () => {
  return (
    <MotionGrowAndFloat>
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>Gamification Station</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Gamification content goes here...</div>
        </CardContent>
      </Card>
    </MotionGrowAndFloat>
  );
};
