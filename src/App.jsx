import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "./lib/gsap.js";
import { useSmoothScroll } from "./lib/smooth.jsx";
import Backdrop from "./components/Backdrop.jsx";
import Cursor from "./components/Cursor.jsx";
import FloatingNav from "./components/FloatingNav.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Studio from "./components/Studio.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Marquee from "./components/Marquee.jsx";
import NotFound from "./components/NotFound.jsx";
import Preloader from "./components/Preloader.jsx";
import ScrollUI from "./components/ScrollUI.jsx";
import SocialRail from "./components/SocialRail.jsx";
import { site } from "./config/site.js";

// The site is a single page. Any other path (e.g. /missing) shows the custom 404 page.
function isHomePath() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const path = window.location.pathname.replace(/\/$/, "");
  return path === base || path === `${base}/index.html`;
}

function seenPreloader() {
  try {
    return sessionStorage.getItem("ma-intro") === "1";
  } catch {
    return false;
  }
}

function Site() {
  // the full intro plays once per browser session; reloads and revisits skip straight to the site
  const [ready, setReady] = useState(seenPreloader);
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (ready) return;
    stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [ready, stop]);

  const done = useCallback(() => {
    try {
      sessionStorage.setItem("ma-intro", "1");
    } catch {
      /* ignore */
    }
    setReady(true);
    start();
    // layout settled: recalculate every scroll animation
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [start]);

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <>
      <AnimatePresence>{!ready && <Preloader onDone={done} />}</AnimatePresence>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Backdrop />
      <Cursor />
      <ScrollUI />
      <SocialRail />
      <FloatingNav />
      <main id="main">
        <Hero ready={ready} />
        <Marquee items={site.marquee} outline />
        <About />
        <Experience />
        <Skills />
        <Marquee items={site.marquee} reverse />
        <Studio />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return isHomePath() ? <Site /> : <NotFound />;
}
