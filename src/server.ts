import http from 'http';

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
        await callback(port, host);
    });
    return server;
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

export { shutdownServer, startServer };