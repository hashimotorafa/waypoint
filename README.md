# Waypoint

Waypoint is a Rails 8 API + React front-end that runs locally via Docker Compose:

| Service | Image | Purpose |
| --- | --- | --- |
| `web` | Custom `ruby:3.3` image (`Dockerfile.dev`) | Rails app, esbuild + Tailwind + React |
| `db` | `postgres:16` | Primary relational database |
| `llm` | `ollama/ollama:latest` | Local LLM runtime for prototyping |

The repository already includes a Kamal scaffold from `rails new`, which we will adapt later for production deploys.

## Local development

### 1. Build the dev image

```shell
docker compose -f docker-compose.dev.yml build web
```

### 2. Start the full stack

```shell
docker compose -f docker-compose.dev.yml up web
```

This composes the Rails server (`localhost:3000`), Postgres (`localhost:5432`), and Ollama (`localhost:11434`).

### 3. Run one-off Rails commands

```shell
# Rails console
docker compose -f docker-compose.dev.yml run --rm web bin/rails console

# Database migrations
docker compose -f docker-compose.dev.yml run --rm web bin/rails db:migrate

# Test suite
docker compose -f docker-compose.dev.yml run --rm web bin/rails test
```

### 4. React front-end workflow

* React + ReactDOM live under `app/javascript`, bundled by esbuild.
* The entry point is `app/javascript/application.jsx`; React mounts into `<div id="root">` defined in `app/views/layouts/application.html.erb`.
* `bin/dev` (started automatically inside the container) runs Rails, Tailwind, and `yarn build --watch` so React changes hot-reload.

### 5. LLM service

* Compose starts `ollama/ollama:latest` and stores model weights in the `ollama_data` volume.
* Exec into the container to pull a model: `docker compose -f docker-compose.dev.yml exec llm ollama pull llama3`.
* Rails code can reach the runtime via `ENV["LLM_ENDPOINT"]` (default `http://llm:11434`).

## Environment configuration

Key variables live in `docker-compose.dev.yml` and are consumed via `config/database.yml`:

| Variable | Default | Purpose |
| --- | --- | --- |
| `DATABASE_HOST` | `db` | Hostname for Postgres |
| `DATABASE_USERNAME` | `postgres` | DB user |
| `DATABASE_PASSWORD` | `postgres` | DB password |
| `DATABASE_NAME` | `waypoint_development` | Rails dev DB |
| `LLM_ENDPOINT` | `http://llm:11434` | Base URL for the Ollama runtime |

## Next steps toward production

1. Split the generated `Dockerfile` into an explicit production build that compiles assets and installs system packages like `libvips` (for Active Storage variants).
2. Use Kamal (already scaffolded) or another orchestrator to ship the Rails container alongside managed Postgres + Ollama equivalents.
3. Harden the Postgres settings (backups, users, TLS) and externalize secrets with `.env` or your platform's secret manager.
4. Expand the React side into a multi-page SPA or integrate a dedicated Vite front-end if hot-module reloading plus routing become complex.

For now, the repo is optimized for running everything locally via Docker while keeping production concerns isolated for later work.
