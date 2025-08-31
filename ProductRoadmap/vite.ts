import path from "path";
import express from "express";
import type { Express } from "express";
import { createServer as createViteServer } from "vite";

// ✅ Utility log function
export function log(message: string) {
  console.log(`[server] ${message}`);
}

// ✅ Setup Vite in dev mode
export async function setupVite(app: Express) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    root: path.resolve(import.meta.dirname, "client"),
  });

  // Let Vite handle frontend in dev
  app.use(vite.middlewares);
}

// ✅ Serve static frontend in production
export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "dist");

  // Serve built static assets
  app.use(express.static(distPath));

  // Catch-all for non-API routes (React Router)
  app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}
