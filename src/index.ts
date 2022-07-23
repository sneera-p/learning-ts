import { config } from "dotenv";
import http from "http";
import { createWriteStream } from "fs";
import { resolve } from "path";
import { startServer, shutdownServer, startup } from "./startup";

function getEnvPath(args: string[] = process.argv): string {
   const i = args.findIndex((e) => /^(-e|--env-file)$/i.test(e));
   return i === -1 ? ".env" : args[i + 1];
}

//main runtime
(async (tmp: string = ".tmp") => {
   config({
      path: resolve(process.cwd(), getEnvPath()),
   });

   const app = await startup({
      logFileSream: createWriteStream(process.env.LOG_FILE),
   });

   let server: http.Server = http.createServer(app);

   server = await startServer({
      server: server,
      port: process.env.PORT,
      host: process.env.HOST,
      callback: async (port, host) => {
         console.log("server at http://%s:%d/", host, port);
      },
   });
})();
