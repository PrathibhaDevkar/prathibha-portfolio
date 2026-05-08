# Prathibha Devkar — Portfolio

Personal portfolio site built with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Language**: TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Structure

```
app/          # Next.js app router (layout, page, globals.css)
components/   # UI components (Navbar, HeroSection, ProjectCard, etc.)
data/         # Content files (projects, experience, skills, etc.)
public/       # Static assets (resume PDF)
```

## Updating Content

All content lives in the `data/` folder — no code changes needed for most updates:

- `data/projects.ts` — add/edit projects
- `data/experience.ts` — work history
- `data/skills.ts` — skill categories
- `data/publication.ts` — research papers
- `data/aboutMe.ts` — bio paragraphs
- `data/contact.ts` — email, LinkedIn, GitHub, resume link
