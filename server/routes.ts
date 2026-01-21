import type { Express } from "express";
import type { Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/analyze", async (req, res) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/legal/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.LEGAL_API_KEY}`,
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.status(response.status).json(data);

    } catch (err) {
      console.error("Proxy error:", err);
      res.status(500).json({
        error: "Failed to connect to LegalAPI",
      });
    }
  });

  return httpServer;
}
