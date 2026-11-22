/**
 * Technology & software logo wall.
 *
 * Each item uses ONE of:
 *   logo:     an imported SVG file (real logo)        – see src/assets/logos
 *   iconPath: an inline Simple Icons path (single-colour logo, follows the theme)
 *   badge:    { text, bg, fg } monogram badge, used where no logo file is bundled
 *   glyph:    a Lucide icon name (for skills/processes that are not software)
 *
 * To use an official logo for a badge item (FileMaker, PageFlex, Active Directory, InDesign, Excel),
 * drop the SVG into src/assets/logos/, import it below, and replace `badge` with `logo`.
 * No proficiency levels are shown on purpose.
 */
import { siGithub } from "simple-icons";
import html5 from "../assets/logos/html5.svg";
import css3 from "../assets/logos/css3.svg";
import javascript from "../assets/logos/javascript.svg";
import react from "../assets/logos/react.svg";
import git from "../assets/logos/git.svg";
import windows from "../assets/logos/windows.svg";
import powershell from "../assets/logos/powershell.svg";
import illustrator from "../assets/logos/illustrator.svg";
import photoshop from "../assets/logos/photoshop.svg";

export const techCategories = ["All", "Programming", "IT", "Creative Software", "Production"];

export const tech = [
  // Programming
  { id: "html5", name: "HTML5", category: "Programming", logo: html5, description: "The structure behind every web page I build." },
  { id: "css3", name: "CSS3", category: "Programming", logo: css3, description: "Styling, layout and responsive design." },
  { id: "javascript", name: "JavaScript", category: "Programming", logo: javascript, description: "Interactivity and front-end logic." },
  { id: "react", name: "React", category: "Programming", logo: react, description: "Component-based interfaces, including this site." },
  { id: "git", name: "Git", category: "Programming", logo: git, description: "Version control for my code." },
  { id: "github", name: "GitHub", category: "Programming", iconPath: siGithub.path, description: "Where my code lives and gets deployed from." },

  // IT
  { id: "windows", name: "Windows", category: "IT", logo: windows, description: "Day-to-day Windows administration and support." },
  { id: "powershell", name: "PowerShell", category: "IT", logo: powershell, description: "Scripting for Windows admin tasks." },
  { id: "ad", name: "Active Directory", category: "IT", badge: { text: "AD", bg: "#0f3d8f", fg: "#ffffff" }, description: "Managing user accounts and access permissions." },
  { id: "filemaker", name: "FileMaker Pro", category: "IT", badge: { text: "Fm", bg: "#1f2a44", fg: "#6fe3ff" }, description: "Where job dockets and production workflows live." },
  { id: "excel", name: "Microsoft Excel", category: "IT", badge: { text: "X", bg: "#107c41", fg: "#ffffff" }, description: "Spreadsheets for tracking, pricing and organizing data." },

  // Creative software
  { id: "illustrator", name: "Adobe Illustrator", category: "Creative Software", logo: illustrator, description: "Vector artwork and print-ready graphics." },
  { id: "photoshop", name: "Adobe Photoshop", category: "Creative Software", logo: photoshop, description: "Image editing and artwork preparation." },
  { id: "indesign", name: "Adobe InDesign", category: "Creative Software", badge: { text: "Id", bg: "#49021f", fg: "#ff3d7f" }, description: "Layouts for print and digital documents." },
  { id: "pageflex", name: "PageFlex", category: "Creative Software", badge: { text: "Pf", bg: "#0d3b3b", fg: "#5eead4" }, description: "Web-to-print and variable-data publishing." },

  // Production
  { id: "prepress", name: "Prepress", category: "Production", glyph: "layers", description: "Checking and preparing files so they print right." },
  { id: "print", name: "Print Production", category: "Production", glyph: "printer", description: "Coordinating jobs from docket to delivery." },
  { id: "artwork", name: "Artwork Preparation", category: "Production", glyph: "pen", description: "Getting artwork production-ready." },
  { id: "dam", name: "Digital Asset Management", category: "Production", glyph: "folder", description: "Keeping files organized and easy to find." },
];

/** Logos shown floating around the hero */
export const heroFloaters = ["html5", "css3", "javascript", "react", "git", "github", "powershell", "illustrator", "photoshop"];
