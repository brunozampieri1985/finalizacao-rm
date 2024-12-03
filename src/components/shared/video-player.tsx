type VideoPlayerProps = {
  src: string;
};

export function VideoPlayer({ src }: VideoPlayerProps) {
  return (
    <div className="flex">
      <iframe
        width="385"
        height="275"
        src={src}
      ></iframe>
    </div>
  );
}
