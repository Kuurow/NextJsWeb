import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import AuroraCanvas from "@/components/AuroraCanvas";
import "../styles/index.css";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="scroll-top"
      aria-label="Scroll to top"
    >
      ↑ Top
    </button>
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuroraCanvas />
      <Component {...pageProps} />
      <ScrollToTop />
    </>
  );
}
