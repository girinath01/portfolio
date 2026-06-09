# Girinath K — AI & Data Science Portfolio

My personal portfolio built with TanStack Start, React 19, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: TanStack Start (React 19) — full-stack React with SSR
- **Routing**: TanStack Router — type-safe file-based routing
- **State**: TanStack Query — server state management
- **Styling**: Tailwind CSS v4
- **UI**: Radix UI primitives + custom components
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build**: Vite 7, TypeScript 5.8

## Project Structure

```
src/
├── assets/           # Vite-processed images
├── components/       # Reusable UI components
├── lib/              # Utilities, error handling
├── routes/           # File-based routes
│   ├── __root.tsx    # Root layout, providers, error boundary
│   └── index.tsx     # Home page (portfolio)
├── server.ts         # SSR entry point
├── styles.css        # Global styles + Tailwind
└── main.tsx          # Client entry
```

## How to Run

```bash
# Install dependencies
npm install

# Development server (HMR)
npm run dev
# → http://localhost:5173

# Production build
npm run build

# Preview production build
npm run preview

# Lint & format
npm run lint
npm run format
```

## Adding Images

Place in `src/assets/` for Vite optimization:
```tsx
import photo from "@/assets/photo.jpeg";
<img src={photo} />
```

Or `public/` for static serving:
```tsx
<img src="/photo.jpeg" />
```