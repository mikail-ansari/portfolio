/**
 * ============================================================
 *  CENTRAL SITE CONFIGURATION
 *  Edit this file to update almost everything on the website.
 *  (Software logos live in `tech.js`.)
 * ============================================================
 *
 *  Email, GitHub and the contact form are EMPTY until you fill them in.
 *  Anything left empty is hidden automatically, so there are never broken links.
 *  You can type values here or set them in a `.env` file (see `.env.example`).
 */

const env = import.meta.env;

export const site = {
  name: "Md Mikail Ansari",
  headline: ["Creative Technologist.", "Building Digital Experiences."],
  roles: [
    "Frontend Developer",
    "Systems Administrator",
    "Production Coordinator",
    "Creative Technologist",
    "Digital Production Specialist",
  ],
  location: "Scarborough, Ontario, Canada",
  intro:
    "I work across technology, creative design, and digital production — connecting systems, code, and creativity to make things work better.",

  // --- Links & contact (empty = hidden) -----------------------
  social: {
    linkedin: "https://www.linkedin.com/in/-mikail-ansari/",
    github: env.VITE_GITHUB_URL || "", // e.g. "https://github.com/mikail-ansari"
  },
  contact: {
    email: env.VITE_CONTACT_EMAIL || "",
    // Free contact-form backend (https://formspree.io). Paste ONLY the form ID, e.g. "xyzabcde"
    formspreeId: env.VITE_FORMSPREE_ID || "",
  },

  // --- Resume (replace the PDF in /public to update) -----------
  resume: { file: "Md-Mikail-Ansari-Resume.pdf", downloadName: "Md-Mikail-Ansari-Resume.pdf" },

  // --- Scrolling words between sections ------------------------
  marquee: ["Frontend", "Systems", "Print Production", "Prepress", "Digital Storefronts", "Creative Tech", "Workflows"],

  // --- About --------------------------------------------------
  about: {
    statement:
      "I'm the person who connects the systems, the code and the creative work, so the whole thing just runs a little better.",
    paragraphs: [
      "These days I'm at HipSkip Communications in Scarborough, where my job sits right where print production, systems support and digital storefronts overlap. I coordinate job dockets in FileMaker Pro, prep and check artwork before it goes to press, keep online ordering portals up to date, and look after the user accounts and everyday IT that keep the team moving.",
      "I started out as a Frontend Engineer at Intelzy in Nepal, building responsive websites with HTML, CSS and JavaScript. I also did a Data Analyst co-op at HipSkip, which taught me how much a tidy process and clean product data matter.",
      "What I enjoy most is the in-between: making something look right, building it so it works right, and smoothing out the process behind it. Practical ideas, tidy workflows and small automations that make everyday work easier.",
    ],
    facts: [
      { label: "Based in", value: "Scarborough, Ontario" },
      { label: "Worked in", value: "Canada & Nepal" },
      { label: "Day job", value: "Production + systems" },
      { label: "Always", value: "Building for the web" },
    ],
  },

  // --- Education ----------------------------------------------
  education: {
    school: "Georgian College",
    program: "Computer Systems Technician – Networking",
    detail: "Diploma, graduated April 2025",
    period: "September 2023 – April 2025",
    location: "Ontario, Canada",
    honors: ["Dean's List – Winter 2024"],
  },

  // --- Experience (most recent first) -------------------------
  experience: [
    {
      company: "HipSkip Communications Inc.",
      title: "Production Coordinator & Systems Administrator",
      years: "2024 — Now",
      period: "September 2024 – Present",
      location: "Scarborough, Ontario, Canada",
      current: true,
      blurb: "Where print production, systems support and digital storefronts meet.",
      points: [
        "Manage print production workflows and job dockets using FileMaker Pro.",
        "Coordinate communication between clients, designers, and production teams.",
        "Handle prepress checks, artwork preparation, file verification, and proofing.",
        "Maintain online ordering portals and storefronts.",
        "Update product listings, pricing matrices, and product information.",
        "Support internal systems, user accounts, access permissions, and troubleshooting.",
        "Organize digital assets and improve production workflows.",
        "Coordinate production schedules and ensure accurate delivery of files.",
      ],
    },
    {
      company: "HipSkip Communications Inc.",
      title: "Data Analyst – Co-op",
      years: "2024 — 2025",
      period: "September 2024 – January 2025",
      location: "Scarborough, Ontario, Canada",
      blurb: "A data-focused co-op at HipSkip.",
      points: [
        "Analyze operational and business data.",
        "Create dashboards and reports.",
        "Perform data quality checks.",
        "Work with databases and data organization.",
        "Support KPI tracking and reporting.",
        "Identify opportunities for process improvements.",
      ],
    },
    {
      company: "Intelzy",
      title: "Frontend Engineer",
      years: "2022 — 2023",
      period: "May 2022 – June 2023",
      location: "Bharatpur, Nepal",
      blurb: "Where I started building for the web.",
      points: [
        "Frontend development with HTML, CSS and JavaScript.",
        "Built responsive websites and implemented user interfaces.",
        "Website styling and optimization.",
        "Worked with development teams.",
      ],
    },
  ],

  // Extra strengths shown under the logo wall
  toolbox: [
    "Responsive Web Design",
    "System Administration",
    "User Account Management",
    "Troubleshooting",
    "IT Support",
    "Job Docket Management",
    "Product Data Management",
    "Online Storefront Management",
    "Workflow Optimization",
    "Data Analysis",
    "Database Management",
    "Data Visualization",
  ],

  // --- Creative Studio ----------------------------------------
  // PLACEHOLDERS: these are NOT finished client projects. To show real work:
  //   1. put the image in /public/studio/   (e.g. /public/studio/poster.jpg)
  //   2. set  image: "/studio/poster.jpg"   and   placeholder: false
  // Items with an empty `image` show generated placeholder art.
  studio: {
    categories: ["Graphic Design", "Print Design", "Digital Artwork", "Marketing Materials", "Print Production", "Web Design"],
    items: [
      { id: "s1", title: "Brand identity concept", category: "Graphic Design", ratio: "4/5", image: "", description: "Replace with a logo, identity or brand-system piece.", placeholder: true },
      { id: "s2", title: "Brochure layout", category: "Print Design", ratio: "1/1", image: "", description: "Replace with a brochure, booklet or catalogue layout.", placeholder: true },
      { id: "s3", title: "Digital illustration", category: "Digital Artwork", ratio: "3/4", image: "", description: "Replace with an illustration or digital artwork.", placeholder: true },
      { id: "s4", title: "Campaign poster", category: "Marketing Materials", ratio: "16/11", image: "", description: "Replace with a poster, flyer or promo piece.", placeholder: true },
      { id: "s5", title: "Prepress-ready file", category: "Print Production", ratio: "4/5", image: "", description: "Replace with a press-ready file, proof or finished print.", placeholder: true },
      { id: "s6", title: "Landing page design", category: "Web Design", ratio: "5/6", image: "", description: "Replace with a web or UI design.", placeholder: true },
      { id: "s7", title: "Packaging mockup", category: "Graphic Design", ratio: "1/1", image: "", description: "Replace with packaging or label artwork.", placeholder: true },
      { id: "s8", title: "Business stationery", category: "Print Design", ratio: "3/4", image: "", description: "Replace with business cards, letterheads or stationery.", placeholder: true },
      { id: "s9", title: "Social media set", category: "Marketing Materials", ratio: "16/10", image: "", description: "Replace with a social or digital marketing set.", placeholder: true },
      { id: "s10", title: "Colour-proofed job", category: "Print Production", ratio: "1/1", image: "", description: "Replace with a production or proofing example.", placeholder: true },
    ],
  },

  // --- Projects -----------------------------------------------
  // PLACEHOLDER project categories, not verified completed projects.
  // To publish a real one: set `placeholder: false`, then fill `image`, `github`, `demo`.
  // Empty links/images are hidden or replaced with generated preview art.
  projects: [
    {
      title: "Personal Portfolio Website",
      category: "Web Design",
      description: "This site: React, Vite, Tailwind, GSAP and Three.js, with a central config file you can edit without touching components.",
      tags: ["React", "Vite", "Tailwind CSS", "GSAP", "Three.js"],
      image: "", // e.g. "/projects/portfolio.png"
      github: "https://github.com/mikail-ansari/portfolio",
      demo: "",
      placeholder: false,
    },
    {
      title: "Digital Workflow Management",
      category: "Graphic Design",
      description: "Placeholder: add a real case study. A production or ordering workflow you improved, the problem, and how it turned out.",
      tags: ["FileMaker Pro", "Workflows", "Production"],
      image: "",
      github: "",
      demo: "",
      placeholder: true,
    },
    {
      title: "Online Storefront Management",
      category: "Web Design",
      description: "Placeholder: add a real example. Storefront or ordering-portal work, product data and pricing matrices.",
      tags: ["Storefronts", "Product Data", "PageFlex"],
      image: "",
      github: "",
      demo: "",
      placeholder: true,
    },
    {
      title: "Frontend Web Development",
      category: "Web Design",
      description: "Placeholder: add a real project. A site or interface you built, with screenshots and a live demo.",
      tags: ["HTML5", "CSS3", "JavaScript", "React"],
      image: "",
      github: "",
      demo: "",
      placeholder: true,
    },
    {
      title: "Business Automation Concepts",
      category: "Digital Artwork",
      description: "Placeholder: add a real example. A script, template or process that takes repetitive work off someone's plate.",
      tags: ["PowerShell", "Automation"],
      image: "",
      github: "",
      demo: "",
      placeholder: true,
    },
  ],
};

export const navLinks = [
  { id: "home", label: "Home", short: "Home" },
  { id: "about", label: "About", short: "About" },
  { id: "experience", label: "Experience", short: "Experience" },
  { id: "skills", label: "Skills", short: "Skills" },
  { id: "studio", label: "Creative Studio", short: "Studio" },
  { id: "projects", label: "Projects", short: "Projects" },
  { id: "contact", label: "Contact", short: "Contact" },
];
