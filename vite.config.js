import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Replaces %SITE_URL% in index.html with VITE_SITE_URL (no trailing slash).
// When VITE_SITE_URL is empty, absolute-URL tags (canonical, og:url) are removed
// and og:image falls back to a root-relative path.
function siteUrlPlugin(siteUrl) {
  return {
    name: "site-url-html",
    transformIndexHtml(html) {
      let out = html;
      if (!siteUrl) {
        out = out
          .split("\n")
          .filter((line) => !line.includes("data-needs-site-url"))
          .join("\n");
      }
      return out.replaceAll("%SITE_URL%", siteUrl);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const siteUrl = (env.VITE_SITE_URL || "").replace(/\/$/, "");
  return {
    // Use "/" for Cloudflare Pages / Vercel / custom domains.
    // For a GitHub Pages *project* site set VITE_BASE=/repo-name/
    base: env.VITE_BASE || "/",
    plugins: [react(), tailwindcss(), siteUrlPlugin(siteUrl)],
    build: { sourcemap: false, chunkSizeWarningLimit: 600 },
  };
});
