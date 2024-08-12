import { FastifyInstance } from "fastify";
import { CreateRouter, DeleteRouter, GetAllRoutes } from "../http/controllers/routes.controller";
import { RestartService } from "../http/index.controller";

export const EndPointsRoutes = async (app: FastifyInstance) => {
  app.post("/create", {
    schema: {
      description: 'Create New Proxy Router',
      body: {
        type: 'object',
        properties: {
          "upstream": { type: 'string' },
          "rewritePrefix": { type: 'string' },
          "prefix": { type: 'string' },
          "isAuth": { type: 'boolean' },
          "jwtSecretsEnv": { type: 'string' }
        },
      },
      response: {
        201: {
          description: 'Successful response',
          type: 'object',
          properties: {
            "id": { type: 'string' },
            "upstream": { type: 'string' },
            "rewritePrefix": { type: 'string' },
            "prefix": { type: 'string' },
            "isAuth": { type: 'boolean' },
            "jwtSecretsEnv": { type: 'string' },
            "createdAt": { type: 'string' },
            "updatedAt": { type: 'string' },
          }
        }
      }
    }
  }, CreateRouter);
  app.get("/routes", GetAllRoutes);
  app.get('/restart', RestartService);
  app.delete('/delete/:routerId', DeleteRouter);
};
