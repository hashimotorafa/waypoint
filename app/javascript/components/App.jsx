import React from "react"

const features = [
  "Rails 8 API + React UI",
  "Dockerized Postgres + Ollama",
  "Tailwind + esbuild pipeline",
  "Ready for prod hardening via Kamal"
]

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
          waypoint
        </p>
        <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
          Rails backend + React frontend, running everywhere via Docker.
        </h1>
        <p className="text-lg text-slate-300">
          Start the stack with docker compose, iterate locally, then harden for production
          with the same containers.
        </p>
        <ul className="mx-auto grid gap-3 text-left sm:grid-cols-2">
          {features.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-slate-400">
          Next up: wire API endpoints, hydrate React with real data, and tune prod Dockerfiles.
        </p>
      </section>
    </main>
  )
}
