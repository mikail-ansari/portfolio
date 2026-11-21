import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const home = import.meta.env.BASE_URL;
  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden px-6 text-center">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="relative">
        <p className="font-mono text-sm text-cyan">Error 404</p>
        <h1 className="text-gradient mt-3 text-7xl font-semibold tracking-tight sm:text-8xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-md text-muted">The page you're looking for doesn't exist or has been moved.</p>
        <a
          href={home}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-neon px-6 py-3 text-sm font-semibold text-[#04141a] hover:brightness-110"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to home
        </a>
      </div>
    </main>
  );
}
