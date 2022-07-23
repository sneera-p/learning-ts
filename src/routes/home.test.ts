import { homeRouter } from "./home";
import req from "supertest";
import express from "express";

describe("Unit test => route /home", () => {
   let app: express.Application;

   beforeAll(() => {
      app = express();
      app.use("/home", homeRouter);
   });

   it("[ /home ] respond with Object", async () => {
      const expected = {
         status: "still holding on boys",
      };
      const res = await req(app).get("/home");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("status", expected.status);
   });

   it("[ /home/admin ] respond with Object", async () => {
      const expected = {
         status: "still holding on boys",
      };
      const res = await req(app).get("/home/admin");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("status", expected.status);
   });
});
