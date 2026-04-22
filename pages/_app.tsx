import type { AppProps } from "next/app";
import AuroraCanvas from "@/components/AuroraCanvas";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuroraCanvas />
      <Component {...pageProps} />
    </>
  );
}
