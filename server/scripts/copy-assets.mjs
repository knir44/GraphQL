import { mkdirSync, copyFileSync } from "node:fs";

mkdirSync("dist/schema", { recursive: true });
copyFileSync("src/schema/schema.graphql", "dist/schema/schema.graphql");
