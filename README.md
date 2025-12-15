# Night Club (Next.js)

Projekt til en night club hjemmeside bygget med Next.js App Router. Lavet af Aylin, Sarah & Marcus - Team SAM

## Tech stack

- Next.js 16 + React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion (animation)
- React Hook Form + Zod (formularer/validering)
- Zustand (state)
- React Icons

## Kom i gang

1. Installér dependencies:

```bash
npm i
```

2. Start dev-server:

```bash
npm run dev
```

Åbn http://localhost:3000

## API

3. Start API lokalt:

```bash
npm start
```

## Arbejdsgang (Git)

Vi bruger en feature-branch workflow for at holde `main` stabil.

- Arbejd ikke direkte på `main`
- Opret en branch pr. feature/fix
- Merge tilbage til `main` når det virker og er testet

**Branch-navne**

- Brug kebab-case og beskrivende navne (engelsk)
- Eksempler: `create-navbar`, `fix-booking-bug`, `gallery-popup`

**Commit-beskeder**

- Skriv korte, beskrivende commits (helst engelsk)
- Brug bydeform: `Add ...`, `Fix ...`, `Remove ...`

## Formatterings- og kode-standard

Vi bruger Prettier til formatering.

- Prettier: formatterer TypeScript/React-kode
- `prettier-plugin-tailwindcss`: sorterer Tailwind classes automatisk

## Projektstruktur

Projektet bruger Next.js App Router og fil-baseret routing.

- `app/`: routes, layouts og pages
- `app/(routes)/`: route groups (organisering uden at ændre URL)
- `app/(routes)/blog/[slug]/`: dynamic routes til blogindlæg
- `app/components/`: genbrugelige og feature-specifikke komponenter
- `app/lib/`: API-klient og helpers
- `app/types/`: TypeScript typer til API og data

Navngivning:

- Komponentfiler i PascalCase (fx `EventCard.tsx`)
