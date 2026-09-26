import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const currentDir = dirname(fileURLToPath(import.meta.url));

// Read the hand-written SDL file as plain text — Apollo Server accepts a
// schema as a string directly, no extra parsing step needed.
export const typeDefs = readFileSync(join(currentDir, "schema.graphql"), "utf-8");
