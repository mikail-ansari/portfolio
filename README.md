# Md Mikail Ansari – Portfolio

React + Vite + Tailwind CSS v4 + Framer Motion + Lucide. Fully static, so it hosts free anywhere.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs /dist
npm run preview    # test the production build
```

## Edit your content
Everything lives in **`src/config/site.js`**: name, intro, about text, experience, skills, projects, education, LinkedIn.
Optional values (email, GitHub, contact form) can also be set in a `.env` file (copy `.env.example`). **Empty values are hidden automatically**, so there are never broken links.

| Want to…                | Do this |
|-------------------------|---------|
| Add GitHub              | Set `VITE_GITHUB_URL` (or `social.github`) – icons appear in Hero, Contact, Footer |
| Show an email           | Set `VITE_CONTACT_EMAIL` – shows in Contact; form falls back to your email app (mailto) |
| Real contact form       | Create a free form at formspree.io, set `VITE_FORMSPREE_ID` (free plan has a monthly submission cap) |
| Add / edit a project    | Edit an item in `projects` in `site.js`: set `placeholder: false`, add `image` (file in `public/projects/`), `github`, `demo` |
| Replace resume          | Overwrite `public/Md-Mikail-Ansari-Resume.pdf` (same name), or edit and run `python Resume/generate_resume.py` |
| Update LinkedIn         | `social.linkedin` in `site.js` (also `sameAs` in `index.html`) |
| Set SEO/social URL      | Set `VITE_SITE_URL=https://your-domain` once you know it (adds canonical + og:url + absolute og:image) |

## Deploy free (recommended: Cloudflare Pages)
1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Build command `npm run build`, output directory `dist`. Add env vars (`VITE_SITE_URL`, etc.) if used.
4. Your site goes live at `<project-name>.pages.dev` with free HTTPS. The project name must be unique; if `mikailansari` is taken, Cloudflare will tell you.

Vercel works the same (Framework: Vite). GitHub Pages: set `VITE_BASE=/repo-name/` (or name the repo `<user>.github.io`) and publish `dist` with a GitHub Action.
`public/404.html` is served automatically for unknown URLs on Cloudflare Pages and GitHub Pages.

## Structure
```
src/config/site.js      all content
src/components/         Navbar, Hero, About, Experience, Skills, Projects, Education, Contact, Footer, NotFound, helpers
public/                 favicon, og-image, 404.html, robots.txt, resume PDF
Resume/generate_resume.py   regenerates the resume PDF
```
