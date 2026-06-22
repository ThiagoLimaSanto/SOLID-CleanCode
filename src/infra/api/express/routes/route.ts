import type { Request, Response } from "express";

export type HttpMethod = "get" | "post";

export const HttpMethod = {
  GET: "get" as HttpMethod,
  POST: "post" as HttpMethod,
} as const;

export interface Route {
  getHandles(): (req: Request, res: Response) => Promise<void>;
  getPath(): string;
  getMethod(): HttpMethod;
}
