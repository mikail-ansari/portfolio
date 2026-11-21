"""
Generates public/Md-Mikail-Ansari-Resume.pdf from the details below.

Usage (from the project root):
    pip install reportlab
    python Resume/generate_resume.py

Only facts supplied by Md Mikail Ansari are included. No email or phone number
was provided, so none is printed. Add them to CONTACT_LINES if you want them on the PDF.

TIP: If you already have your own resume PDF, just replace
public/Md-Mikail-Ansari-Resume.pdf with it (same file name) and you're done.
"""
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit

OUT = Path(__file__).resolve().parent.parent / "public" / "Md-Mikail-Ansari-Resume.pdf"

NAME = "Md Mikail Ansari"
TITLE = "Production Coordinator | Systems Administrator | Frontend Developer"
CONTACT_LINES = ["Scarborough, Ontario, Canada", "linkedin.com/in/-mikail-ansari"]
LINKEDIN_URL = "https://www.linkedin.com/in/-mikail-ansari/"

SUMMARY = (
    "Technology-focused professional with experience in print production coordination, systems "
    "administration, frontend development, and digital workflow management. Enjoys combining "
    "technology, business operations, and automation to build practical solutions that make "
    "everyday work more efficient."
)

EXPERIENCE = [
    ("Production Coordinator & Systems Administrator", "HipSkip Communications Inc.",
     "September 2024 – Present", "Scarborough, Ontario, Canada", [
        "Manage print production workflows and job dockets using FileMaker Pro.",
        "Coordinate communication between clients, designers, and production teams.",
        "Handle prepress checks, artwork preparation, file verification, and proofing.",
        "Maintain online ordering portals and storefronts; update product listings, pricing matrices, and product information.",
        "Support internal systems, user accounts, access permissions, and troubleshooting.",
        "Organize digital assets, improve production workflows, and coordinate production schedules for accurate file delivery.",
    ]),
    ("Data Analyst – Co-op", "HipSkip Communications Inc.",
     "September 2024 – January 2025", "Scarborough, Ontario, Canada", [
        "Analyzed operational and business data; created dashboards and reports.",
        "Performed data quality checks and worked with databases and data organization.",
        "Supported KPI tracking and reporting; identified opportunities for process improvements.",
    ]),
    ("Frontend Engineer", "Intelzy",
     "May 2022 – June 2023", "Bharatpur, Nepal", [
        "Frontend development with HTML, CSS and JavaScript; built responsive websites and implemented user interfaces.",
        "Handled website styling and optimization while working with development teams.",
    ]),
]

EDUCATION = [("Computer Systems Technician – Networking", "Georgian College",
              "September 2023 – April 2025", "Ontario, Canada", "Dean's List – Winter 2024")]

SKILLS = [
    ("Web Development", "HTML, CSS, JavaScript, React.js, Responsive Web Design"),
    ("Systems & IT", "FileMaker Pro, System Administration, User Account Management, Troubleshooting, "
                     "Windows Administration, Active Directory, PowerShell, IT Support"),
    ("Print Production & Operations", "Print Production Coordination, Prepress, Artwork Preparation, Adobe Illustrator, "
                                      "Adobe Photoshop, Adobe InDesign, Job Docket Management, Digital Asset Management"),
    ("Data & Business Systems", "Data Analysis, Database Management, Microsoft Excel, Data Visualization, "
                                "Online Storefront Management, Product Data Management, Workflow Optimization"),
]

INK, MUTED, ACCENT, RULE = HexColor("#111827"), HexColor("#4b5563"), HexColor("#0e7490"), HexColor("#d1d5db")
W, H = letter
M = 0.7 * inch
CW = W - 2 * M

c = canvas.Canvas(str(OUT), pagesize=letter)
c.setTitle(f"{NAME} – Resume")
c.setAuthor(NAME)
c.setSubject(TITLE)
y = H - M


def wrap(text, font, size, width):
    return simpleSplit(text, font, size, width)


def section(title):
    global y
    y -= 8
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(ACCENT)
    c.drawString(M, y, title.upper())
    y -= 4
    c.setStrokeColor(RULE)
    c.setLineWidth(0.7)
    c.line(M, y, W - M, y)
    y -= 13


def para(text, font="Helvetica", size=9.5, color=INK, x=M, width=CW, lead=12.6):
    global y
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrap(text, font, size, width):
        c.drawString(x, y, line)
        y -= lead


# Header
c.setFont("Helvetica-Bold", 25)
c.setFillColor(INK)
c.drawString(M, y - 8, NAME)
y -= 26
c.setFont("Helvetica", 10.5)
c.setFillColor(ACCENT)
c.drawString(M, y, TITLE)
y -= 15
c.setFont("Helvetica", 9.5)
c.setFillColor(MUTED)
contact = "   |   ".join(CONTACT_LINES)
c.drawString(M, y, contact)
lw = c.stringWidth("   |   ".join(CONTACT_LINES[:-1]) + "   |   ", "Helvetica", 9.5)
c.linkURL(LINKEDIN_URL, (M + lw, y - 2, M + c.stringWidth(contact, "Helvetica", 9.5), y + 9), relative=0)
y -= 8

section("Professional Summary")
para(SUMMARY)

section("Experience")
for title, company, period, loc, bullets in EXPERIENCE:
    c.setFont("Helvetica-Bold", 10.5)
    c.setFillColor(INK)
    c.drawString(M, y, title)
    c.setFont("Helvetica", 9.5)
    c.setFillColor(MUTED)
    c.drawRightString(W - M, y, period)
    y -= 12.5
    c.setFont("Helvetica-Bold", 9.5)
    c.setFillColor(ACCENT)
    c.drawString(M, y, company)
    c.setFont("Helvetica", 9.5)
    c.setFillColor(MUTED)
    c.drawRightString(W - M, y, loc)
    y -= 13
    for b in bullets:
        lines = wrap(b, "Helvetica", 9.5, CW - 14)
        c.setFillColor(ACCENT)
        c.circle(M + 4, y + 3, 1.2, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("Helvetica", 9.5)
        for ln in lines:
            c.drawString(M + 14, y, ln)
            y -= 12.2
    y -= 5

section("Education")
for prog, school, period, loc, honor in EDUCATION:
    c.setFont("Helvetica-Bold", 10.5)
    c.setFillColor(INK)
    c.drawString(M, y, prog)
    c.setFont("Helvetica", 9.5)
    c.setFillColor(MUTED)
    c.drawRightString(W - M, y, period)
    y -= 12.5
    c.setFont("Helvetica-Bold", 9.5)
    c.setFillColor(ACCENT)
    c.drawString(M, y, school)
    c.setFont("Helvetica", 9.5)
    c.setFillColor(MUTED)
    c.drawRightString(W - M, y, loc)
    y -= 13
    para(honor, font="Helvetica-Oblique")

section("Technical Skills")
for cat, items in SKILLS:
    label = cat + ":  "
    c.setFont("Helvetica-Bold", 9.5)
    lw = c.stringWidth(label, "Helvetica-Bold", 9.5)
    lines = wrap(items, "Helvetica", 9.5, CW - lw)
    c.setFillColor(INK)
    c.drawString(M, y, label)
    c.setFont("Helvetica", 9.5)
    for i, ln in enumerate(lines):
        c.drawString(M + lw, y, ln)
        y -= 12.4
    y -= 3

assert y > M - 10, f"Content overflows the page (y={y:.0f}); shorten the text."
c.showPage()
c.save()
print("Wrote", OUT, "| remaining space:", round(y - M), "pt")
