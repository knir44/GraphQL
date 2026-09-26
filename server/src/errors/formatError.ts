import type { GraphQLFormattedError } from "graphql";
import { logger } from "../logger/logger.js";
import { env } from "../config/env.js";

// What gets logged (full detail, server-side only) vs. what gets sent to
// the client (sanitized) is deliberately different: the client never sees
// a stack trace outside development.
export function formatError(
  formattedError: GraphQLFormattedError,
  error: unknown,
): GraphQLFormattedError {
  logger.error({ err: error, path: formattedError.path }, "GraphQL error");

  if (env.isProduction) {
    return {
      message: formattedError.message,
      path: formattedError.path,
      extensions: {
        code: formattedError.extensions?.code ?? "INTERNAL_SERVER_ERROR",
      },
    };
  }

  return formattedError;
}
