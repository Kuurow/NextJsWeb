import Sphere from "@/components/Sphere";
import HomePage from "@/components/HomePage";
import Script from "next/script";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HomePage />
      <Sphere />
      <Script src="./libs/anime.min.js" strategy="beforeInteractive"></Script>
      <Script src="./libs/sphereAnime.js" strategy="afterInteractive" ></Script>
    </div>
  );
}
