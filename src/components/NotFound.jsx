import { ArrowLeft } from "lucide-react";
import MALogo from "./MALogo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function NotFound() {
  const home = import.meta.env.BASE_URL;
  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden px-6 text-center">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>
      <div className="relative">
        <MALogo draw className="mx-auto mb-8 w-24" />
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-4 text-[clamp(3.4rem,13vw,10rem)]">
          <span className="outline-accent">Page</span> <span className="grad-text">lost</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-muted">The page you're looking for doesn't exist or has moved. Let's get you back to the good stuff.</p>
        <a href={home} className="mt-9 inline-flex items-center gap-2 rounded-full bg-lime px-8 py-4 text-sm font-bold uppercase tracking-wide text-onlime">
          <ArrowLeft size={16} aria-hidden="true" /> Back home
        </a>
      </div>
    </main>
  );
}
