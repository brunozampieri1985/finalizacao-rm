"use client";

import { VideoCard } from "@/components/shared/video-card";
import { VideoPlayer } from "@/components/shared/video-player";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";


const VIDEOS = [
  {
    title: "Protótipo Inicial",
    src: "",
    description: "Aula de Erika Nobrega sobre protótipos de projetos iniciais.",
  },
  {
    title: "Protótipo 01",
    src: "",
    description:
      "Aula 01 de Erika Nobrega sobre protótipos de projetos executivos.",
  },
  {
    title: "Protótipo 02",
    src: "",
    description:
      "Aula 02 de Erika Nobrega sobre protótipos de projetos executivos.",
  },
  {
    title: "Protótipo 03",
    src: "",
    description:
      "Aula 03 de Erika Nobrega sobre protótipos de projetos executivos.",
  },
  {
    title: "Complementos 01",
    src: "https://www.youtube.com/embed/A5TFdII1jYs",
    description:
      "Aulas 01 de complementos, emissão de pedidos, cáculos e outros...",
  },
  {
    title: "Complementos 2",
    src: "",
    description:
      "Aulas 02 de complementos, emissão de pedidos, cáculos e outros...",
  },
];
export default function Aulas() {
  return (
    <main className="flex flex-col min-h-full items-center overflow-hidden w-full p-4">
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 justify-center w-full">
        {VIDEOS.map((video, key) => (
          <VideoCard
            src={video.src}
            description={video.description}
            title={video.title}
            key={key}
          />
        ))}
      </div>
    </main>
  );
}
