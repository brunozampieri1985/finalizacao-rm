import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Central de Projetos - R&M Planejados",
    short_name: "R&M - Central de Projetos",
    description: "Plataforma de uso exclusivo de funcionário.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000587",
    screenshots: [
      {
        src: "screenshot.png",
        sizes: "1280x720",
        type: "image/png",
      },
      {
        src: "screenshot1.png",
        sizes: "1280x720",
        type: "image/png",
        //@ts-ignore
        form_factor: "wide",
      },
    ],
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
