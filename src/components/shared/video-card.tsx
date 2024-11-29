
import { Card, CardHeader, CardDescription, CardContent } from "../ui/card";
import { VideoPlayer } from "./video-player";


export type VideoCardProps = {
    title: string;
    src: string;
    description: string;
  };

export function VideoCard({ title, src, description }: VideoCardProps) {
  return (
    <Card className="flex flex-col w-[390px]">
      <CardHeader>{title}</CardHeader>
      <CardDescription className="px-4">{description}</CardDescription>
      <CardContent className="mt-4">
        <VideoPlayer src={src} />
      </CardContent>
    </Card>
  );
}
