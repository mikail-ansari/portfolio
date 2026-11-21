/**
 * ============================================================
 *  CENTRAL SITE CONFIGURATION
 *  Edit this file to update almost everything on the website.
 * ============================================================
 *
 *  Values for email, GitHub and the contact form are intentionally
 *  EMPTY until you fill them in. Anything left empty is hidden
 *  automatically, so the site never shows a broken link.
 *
 *  You can either type the value directly below, or set it in a
 *  `.env` file (see `.env.example`).
 */

const env = import.meta.env;

export const site = {
  name: "Md Mikail Ansari",
  roles: ["Production Coordinator", "Systems Administrator", "Frontend Developer"],
  location: "Scarborough, Ontario, Canada",
  intro:
    "I bridge the gap between technology and operations, building efficient digital workflows and managing the systems that keep businesses running.",

  // --- Links & contact (empty = hidden) -----------------------
  social: {
    linkedin: "https://www.linkedin.com/in/-mikail-ansari/",
    github: env.VITE_GITHUB_URL || "", // e.g. "https://github.com/your-username"
  },
  contact: {
    email: env.VITE_CONTACT_EMAIL || "", // e.g. "you@example.com"
    // Free contact-form backend (https://formspree.io). Paste ONLY the form ID, e.g. "xyzabcde"
    formspreeId: env.VITE_FORMSPREE_ID || "",
  },

  // --- Resume -------------------------------------------------
  // Replace the file at /public/Md-Mikail-Ansari-Resume.pdf to update it.
  resume: {
    file: "Md-Mikail-Ansari-Resume.pdf",
    downloadName: "Md-Mikail-Ansari-Resume.pdf",
  },

  // --- About --------------------------------------------------
  about: {
    paragraphs: [
      "I'm a technology-focused professional who enjoys the point where business operations meet software. My career started in frontend development in Nepal, where I built responsive, user-facing websites with HTML, CSS and JavaScript as a Frontend Engineer at Intelzy.",
      "In Canada, I completed the Computer Systems Technician – Networking program at Georgian College, earned a spot on the Dean's List in Winter 2024, and joined HipSkip Communications Inc. as a Data Analyst co-op. Today I work there as a Production Coordinator & Systems Administrator, managing print production workflows and job dockets in FileMaker Pro, maintaining online ordering portals, and supporting the internal systems and user accounts the team depends on every day.",
      "I'm most interested in automation, digital solutions and anything that turns repetitive, error-prone work into a clear and efficient process. I like building practical solutions that make everyday work easier for the people doing it.",
    ],
    highlights: [
      { icon: "map", label: "Based in", value: "Scarborough, Ontario" },
      { icon: "globe", label: "Experience in", value: "Canada & Nepal" },
      { icon: "code", label: "Background", value: "Frontend development" },
      { icon: "cog", label: "Currently", value: "Production & systems administration" },
    ],
  },

  // --- Experience (most recent first) -------------------------
  experience: [
    {
      company: "HipSkip Communications Inc.",
      title: "Production Coordinator & Systems Administrator",
      period: "September 2024 – Present",
      location: "Scarborough, Ontario, Canada",
      current: true,
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
      period: "September 2024 – January 2025",
      location: "Scarborough, Ontario, Canada",
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
      period: "May 2022 – June 2023",
      location: "Bharatpur, Nepal",
      points: [
        "Frontend development with HTML, CSS and JavaScript.",
        "Built responsive websites and implemented user interfaces.",
        "Website styling and optimization.",
        "Worked with development teams.",
      ],
    },
  ],

  // --- Skills -------------------------------------------------
  skills: [
    {
      title: "Web Development",
      icon: "code",
      blurb: "Building responsive, accessible interfaces.",
      items: ["HTML", "CSS", "JavaScript", "React.js", "Responsive Web Design"],
    },
    {
      title: "Systems & IT",
      icon: "server",
      blurb: "Keeping people and systems running.",
      items: [
        "FileMaker Pro",
        "System Administration",
        "User Account Management",
        "Troubleshooting",
        "Windows Administration",
        "Active Directory",
        "PowerShell",
        "IT Support",
      ],
    },
    {
      title: "Print Production & Operations",
      icon: "printer",
      blurb: "From artwork to accurate delivery.",
      items: [
        "Print Production Coordination",
        "Prepress",
        "Artwork Preparation",
        "Adobe Illustrator",
        "Adobe Photoshop",
        "Adobe InDesign",
        "Job Docket Management",
        "Digital Asset Management",
      ],
    },
    {
      title: "Data & Business Systems",
      icon: "chart",
      blurb: "Turning data into clear decisions.",
      items: [
        "Data Analysis",
        "Database Management",
        "Microsoft Excel",
        "Data Visualization",
        "Online Storefront Management",
        "Product Data Management",
        "Workflow Optimization",
      ],
    },
  ],

  // --- Projects -----------------------------------------------
  // These are PLACEHOLDER project categories, not verified completed projects.
  // To publish a real project: set `placeholder: false`, then fill in
  // `image`, `github` and/or `demo`. Empty links/images are hidden.
  projects: [
    {
      title: "Personal Portfolio Website",
      icon: "layout",
      description:
        "This website: a responsive React, Vite and Tailwind CSS portfolio with a central configuration file.",
      tags: ["React.js", "Vite", "Tailwind CSS"],
      image: "", // e.g. "/projects/portfolio.png" (put the file in /public/projects/)
      github: "", // repository URL
      demo: "", // live demo URL
      placeholder: true,
    },
    {
      title: "Digital Workflow Management",
      icon: "workflow",
      description:
        "Add a real case study here: a workflow you improved, the problem it solved and the result.",
      tags: ["FileMaker Pro", "Workflow Optimization"],
      image: "",
      github: "",
      demo: "",
      placeholder: true,
    },
    {
      title: "Online Storefront Management",
      icon: "store",
      description:
        "Add a real case study here: storefront or ordering-portal work, product data and pricing matrices.",
      tags: ["Product Data Management", "Online Storefronts"],
      image: "",
      github: "",
      demo: "",
      placeholder: true,
    },
    {
      title: "Frontend Web Development",
      icon: "code",
      description:
        "Add a real project here: a site or interface you built, with screenshots and a live demo.",
      tags: ["HTML", "CSS", "JavaScript", "React.js"],
      image: "",
      github: "",
      demo: "",
      placeholder: true,
    },
    {
      title: "Business Automation Concepts",
      icon: "cog",
      description:
        "Add a real example here: a script, template or process that automates repetitive work.",
      tags: ["PowerShell", "Automation"],
      image: "",
      github: "",
      demo: "",
      placeholder: true,
    },
  ],

  // --- Education ----------------------------------------------
  education: [
    {
      school: "Georgian College",
      program: "Computer Systems Technician – Networking",
      period: "September 2023 – April 2025",
      location: "Ontario, Canada",
      honors: ["Dean's List – Winter 2024"],
    },
  ],
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
