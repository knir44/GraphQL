import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./logger/logger.js";

const app = await createApp();

app.listen(env.port, () => {
  logger.info(`Server ready at http://localhost:${env.port}/graphql`);
});
