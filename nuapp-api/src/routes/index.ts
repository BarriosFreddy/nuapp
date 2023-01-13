import { Express, Request, Response } from "express";
import useraccountRouter from "./user-account.routes";
import authRouter from "./auth.routes";

export function registerRoutes(app: Express): void {
  app.get("/", (_req: Request, res: Response) => {
    res.send({
      appName: "Nuapp",
      version: "0.0.1",
      description: "",
    });
  });
  app.use("/user-accounts", useraccountRouter);
  app.use("/auth", authRouter);
}