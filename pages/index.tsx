import Sphere from "@/components/Sphere";
import HomePage from "@/components/HomePage";
import Script from "next/script";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col align-middle xl:mr-auto xl:ml-auto">
      <HomePage />
      <Script src="/libs/anime.min.js" />
      <Script src="/libs/sphereAnime.js" />
    </main>
    
  );
}
