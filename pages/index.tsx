import Sphere from "@/components/Sphere";
import HomePage from "@/components/HomePage";
import Script from "next/script";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen flex flex-col max-w-screen-xl align-middle xl:mr-auto xl:ml-auto">
      <HomePage />
    </main>
  );
}
