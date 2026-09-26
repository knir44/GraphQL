import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { env } from "./config/env.js";
import { requestLogger } from "./logger/requestLogger.js";
import { typeDefs } from "./schema/index.js";
import { resolvers } from "./resolvers/index.js";
import { formatError } from "./errors/formatError.js";
import { buildContext, type GraphQLContext } from "./context.js";

export async function createApp() {
  const app = express();

  // 1. Request logging first, so every request gets a req.id/req.log even
  // if something downstream fails.
  app.use(requestLogger);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  const apolloServer = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    formatError,
  });
  await apolloServer.start();

  // 2. cors() + express.json() are required explicitly by Apollo Server 4's
  // Express integration (it no longer bundles its own HTTP server).
  app.use(
    "/graphql",
    cors({ origin: env.clientUrl }),
    express.json(),
    expressMiddleware(apolloServer, { context: buildContext }),
  );

  return app;
}
