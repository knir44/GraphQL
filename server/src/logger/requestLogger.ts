import { randomUUID } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { pinoHttp } from "pino-http";
import { logger } from "./logger.js";

// Attaches req.log (a child logger tagged with a per-request id) to every
// request, before the GraphQL route — so resolver logs and the surrounding
// HTTP request log line share the same req.id and can be correlated.
export const requestLogger = pinoHttp({
  logger,
  genReqId: (req: IncomingMessage, res: ServerResponse) => {
    const existing = req.headers["x-request-id"];
    if (typeof existing === "string") return existing;
    const id = randomUUID();
    res.setHeader("x-request-id", id);
    return id;
  },
});
