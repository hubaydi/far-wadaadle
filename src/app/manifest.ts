import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Far-Wadaadle",
    short_name: "Far-Wadaadle",
    description: "Somali Latin to Far-Wadaad Converter",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1d4ed8",
    icons: [
      {
        src: "/brand-icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
