import http from "http";
import express, { Express } from "express";
import { logger } from "express-winston";
import { transports, format } from "winston";
import { homeRouter, shutdownRouter } from "./routes";

interface StartupArgs {
   logFileSream: NodeJS.WritableStream;
}
/**
 * starts the express server
 * @param {StartupArgs} {port, host, callback, logFileName}
 * @returns {http.Server} server
 */
async function startup({ logFileSream }: StartupArgs): Promise<Express> {
   const app = express();

   /* log file */
   app.use(
      logger({
         transports: [
            new transports.Stream({
               stream: logFileSream,
            }),
         ],
         format: format.combine(format.colorize(), format.simple()),
      })
   );

   //routes
   app.use("/home", homeRouter);
   app.use("/shutdown", shutdownRouter);

   app.get("/", async (req, res) => {
      res.json({
         in: "the center",
      });
   });

   return app;
}

export { startup }