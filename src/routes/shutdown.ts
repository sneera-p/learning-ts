import express from "express";
import { server } from '../index';
import { shutdownServer } from "../server";

function randomString(): string {
    return new String(Math.random() * Math.random() * Math.random() * 100).toString()
}

/**
 * *path : /shutdown/
 */
namespace ShutdownRouter {
    export const router = express.Router();

    const spath = randomString();
    console.log("shutdown : /%s", spath)

    router.get(`/${spath}`, async (req, res) => {
        shutdownServer({
            server: server,
            callback: async () => {
                console.log('shutting down')
            }
        })
    })
}

export const shutdownRouter = ShutdownRouter.router;