# 7-3-useEffect

### 1. Create a local Postgres database

```sh
createdb todos_db
```

### 2. Configure environment variables

```sh
cp server/.env.template server/.env
```

Fill in your Postgres credentials. The `pg` library reads `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, and `PGDATABASE` from the environment automatically.

### 3. Install dependencies

```sh
cd server && npm install
cd ../frontend && npm install
```

### 4. Seed the database

```sh
cd server && npm run db:seed
```

### 5. Start both dev servers

```sh
# Terminal 1 — Express API on http://localhost:8080
cd server && npm run dev

# Terminal 2 — Vite dev server on http://localhost:5173
cd frontend && npm run dev
```

**Open the app at [http://localhost:5173](http://localhost:5173)**, not 8080. The Vite dev server proxies `/api/*` to Express on port 8080. Because the browser treats both as the same origin, session cookies flow through transparently.
