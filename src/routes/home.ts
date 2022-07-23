import express from "express";

/**
 * *path : /home/
 */
namespace HomeRouter {
   export const router = express.Router();

   router.get("/", async (req, res) => {
      res.json({
         status: "still holding on boys",
         msg: "in home",
      });
   });

   router.get("/admin", async (req, res) => {
      res.json({
         status: "still holding on boys",
         msg: "whoa ur admin... Welcome back m'lord",
      });
   });
}

export const homeRouter = HomeRouter.router;
