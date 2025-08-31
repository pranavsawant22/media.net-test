import path from "path";
import express from "express";
import type { Express } from "express";
import { createServer as createViteServer } from "vite";

export function log(message: string) {
  console.log(`[server] ${message}`);
}

export async function setupVite(app: Express) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    root: path.resolve(import.meta.dirname, "../client"),
  });
  app.use(vite.middlewares);
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "../dist");

  app.use(express.static(distPath));

  // React SPA catch-all, but exclude /api/*
  app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}
