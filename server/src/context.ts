import type { Request } from "express";
import type { PrismaClient } from "@prisma/client";
import type { Logger } from "pino";
import { prisma } from "./db/prisma.js";

export interface GraphQLContext {
  prisma: PrismaClient;
  logger: Logger;
}

// req.log is attached by pino-http (see logger/requestLogger.ts), so every
// resolver invoked during this request logs under the same request id.
export async function buildContext({ req }: { req: Request }): Promise<GraphQLContext> {
  return {
    prisma,
    logger: (req as Request & { log: Logger }).log,
  };
}
