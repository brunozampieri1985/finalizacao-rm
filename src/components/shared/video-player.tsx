type VideoPlayerProps = {
  src: string;
};

export function VideoPlayer({ src }: VideoPlayerProps) {
  return (
    <video width={390} controls>
      <source src={src} type={"video/mp4"} />
    </video>
  );
}
