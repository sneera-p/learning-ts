import express, { Express } from "express";
import req from "supertest";
import { PassThrough } from "stream";
import { startup } from "../../src/startup";

describe("Int test => routes", () => {
   let app: Express;

   it("[ / ] should return Object", async () => {
      const expected = {
         in: "the center",
      };
      const res = await req(app).get("/");
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(expected);
   });

   beforeAll(async () => {
      app = await startup({ logFileSream: new PassThrough() });
   });
});
