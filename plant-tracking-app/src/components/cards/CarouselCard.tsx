import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MotionCarouselWrapper } from "@/components/animation/MotionCarouselWrapper";
import MotionGrowAndFloat from "@/components/animation/MotionGrowAndFloat";

export const CarouselCard = () => {
  return (
    <MotionGrowAndFloat>
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>Carousel of Recently Uploaded Plant Pics</CardTitle>
        </CardHeader>
        <CardContent>
          <MotionCarouselWrapper />
        </CardContent>
      </Card>
    </MotionGrowAndFloat>
  );
};
