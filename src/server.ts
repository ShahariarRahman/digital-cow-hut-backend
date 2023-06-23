import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { logger, errorLogger } from "./shared/logger";
import { Server } from "http";

// sync task, outside app: Uncaught Exception
process.on("uncaughtException", error => {
  errorLogger.error(error); // error log
  process.exit(1); // off server
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info("🛢 database connected successfully");

    server = app.listen(config.port, () => {
      logger.info(`listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error("Failed to connected database", err);
  }

  // Gracefully off server: unhandled Rejection:(promise/async)
  process.on("unhandledRejection", error => {
    if (server) {
      // if server running: server.close> log> process.exit
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

// SIGTERM (signal termination):
// if get signal(from process manager/manually by us), terminate server
process.on("SIGTERM", () => {
  if (server) {
    server.close(() => {
      logger.info("SIGTERM is received");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// error sync task, outside app is Uncaught Exception.
// console.log(x);
