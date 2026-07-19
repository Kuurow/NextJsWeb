import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import SiteBackground from "@/components/SiteBackground";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
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
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Preloader />
      <SiteBackground />
      <Nav />
      <Component {...pageProps} />
      <ScrollToTop />
    </>
  );
}
