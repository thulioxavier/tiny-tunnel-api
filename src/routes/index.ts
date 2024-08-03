import { FastifyInstance } from "fastify";
import { CreateRouter } from "../http/controllers/routes.controller";

export const EndPointsRoutes = async (app: FastifyInstance) => {
  app.post("/create", CreateRouter);
  app.get("/create", () => {
    console.log("List Routers");
  });
};
