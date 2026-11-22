# Md Mikail Ansari – Portfolio

Creative-technologist portfolio built with **React 19 · Vite · Tailwind CSS v4 · Framer Motion · GSAP + ScrollTrigger · Lenis · Three.js (React Three Fiber)**.
Fully static, so it hosts free anywhere. Day and night themes (remembered per visitor), custom cursor, MA preloader, 3D hero, software logo wall, Creative Studio gallery with lightbox, interactive terminal.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs /dist
npm run preview    # test the production build
```

## Edit your content
Almost everything lives in **`src/config/site.js`** (text, experience, studio gallery, projects, links) and **`src/config/tech.js`** (software logo wall).
Optional values (email, GitHub, contact form) can also be set via environment variables (copy `.env.example`). **Empty values are hidden automatically**, so there are never broken links.

| Want to…                    | Do this |
|-----------------------------|---------|
| Add GitHub / email          | `VITE_GITHUB_URL`, `VITE_CONTACT_EMAIL` (or `social.github`, `contact.email` in `site.js`) |
| Real contact form           | Create a free form at formspree.io, set `VITE_FORMSPREE_ID` |
| Add real Creative Studio work | Put the image in `public/studio/`, then in `site.js → studio.items` set `image: "/studio/file.jpg"` and `placeholder: false`. Add/remove items freely; categories come from `studio.categories` |
| Add / edit a project        | `site.js → projects`: set `placeholder: false`, add `image` (file in `public/projects/`), `github`, `demo` |
| Swap a badge for an official logo | Put the SVG in `src/assets/logos/`, import it in `tech.js`, replace `badge:` with `logo:` (FileMaker, PageFlex, Active Directory, InDesign, Excel currently use monogram badges) |
| Replace resume              | Overwrite `public/Md-Mikail-Ansari-Resume.pdf` (same name) |
| Change colours              | CSS variables at the top of `src/index.css` (`[data-theme="dark"]` / `[data-theme="light"]`) |
| Set SEO/social URL          | `VITE_SITE_URL=https://your-domain` (adds canonical, og:url, absolute og:image) |

Accessibility: respects `prefers-reduced-motion` (no smooth-scroll hijack, cursor effects, parallax or looping animation), keyboard-accessible menus, gallery and terminal.

## Deploy (Cloudflare)
Build command `npm run build`. `wrangler.jsonc` serves `dist/` and the styled `404.html`. Add the `VITE_*` variables under Settings → Build → Variables and secrets, then redeploy.
For Pages/Vercel, output directory is `dist`. GitHub Pages: set `VITE_BASE=/repo-name/`.

## Structure
```
src/config/site.js, tech.js   all content
src/lib/                      theme, smooth scroll (Lenis), GSAP setup
src/components/               Hero, HeroScene (3D, lazy-loaded), About, Experience, Skills, Studio, Projects, Terminal, Contact, nav, cursor, preloader…
src/assets/logos/             software logo SVGs
public/                       favicon, og-image, 404.html, resume PDF
Resume/generate_resume.py     regenerates the resume PDF
```
