import http from "http";
import express, { Express } from "express";
import { logger } from "express-winston";
import { transports, format } from "winston";
import { homeRouter } from "./routes";

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

   app.get("/", async (req, res) => {
      res.json({
         in: "the center",
      });
   });

   return app;
}

interface ShutdownArgs {
   server: http.Server;
   callback: () => Promise<void>;
}
/**
 * stops server
 * @param {ShutdownArgs} {server, callback}
 * @returns {http.Server} server
 */
async function shutdownServer({
   server,
   callback,
}: ShutdownArgs): Promise<http.Server> {
   server.close((err) => {
      err ? console.log(err) : callback();
   });
   return server;
}

interface StartArgs {
   server: http.Server;
   port: number;
   host: string;
   callback: (port: number, host: string) => Promise<void>;
}
/**
 * starts server
 * @param {StartArgs} {server, port, host, callback}
 * @returns {http.Server} server
 */
async function startServer({
   server,
   port,
   host,
   callback,
}: StartArgs): Promise<http.Server> {
   server.listen(port, host, async () => {
      callback(port, host);
   });
   return server;
}

export { startup, shutdownServer, startServer };
