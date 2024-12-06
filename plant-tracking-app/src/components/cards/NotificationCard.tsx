import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MotionGrowAndFloat from "@/components/animation/MotionGrowAndFloat";

export const NotificationCard = () => {
  return (
    <MotionGrowAndFloat>
      <Card className="flex flex-grow">
        <CardHeader>
          <CardTitle>notification Card</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Content TBD...</div>
        </CardContent>
      </Card>
    </MotionGrowAndFloat>
  );
};
