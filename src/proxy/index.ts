import fastifyHttpProxy, { FastifyHttpProxyOptions } from "@fastify/http-proxy";
import { Routes } from "@prisma/client";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { dbClient } from "../config/database/client";
import fastifyJwt from "@fastify/jwt";
import fastifyAuth from "@fastify/auth";

export const ProxyConfig = async (app: FastifyInstance) => {
  const proxies: Routes[] | [] =
    (await dbClient.routes.findMany({ where: { deletedAt: null } })) ?? [];

  app.register(fastifyAuth);

  proxies.forEach(
    ({
      upstream,
      prefix,
      rewritePrefix,
      httpMethods,
      isAuth,
      jwtSecretsEnv,
    }) => {
      const proxyOptions: FastifyHttpProxyOptions = {
        upstream,
        prefix,
        rewritePrefix,
        httpMethods: JSON.parse(httpMethods),
      };

      if (isAuth && jwtSecretsEnv) {
        const jwtSecret = process.env[jwtSecretsEnv];

        if (!jwtSecret) {
          throw new Error(`JWT secret for ${jwtSecretsEnv} is not defined`);
        }

        app.register(fastifyJwt, {
          secret: jwtSecret,
        });

        app.decorate(
          "authenticate",
          async (request: FastifyRequest, reply: FastifyReply) => {
            try {
              await request.jwtVerify();
              request.headers["x-user"] = JSON.stringify(request.user);
            } catch (err) {
              reply.send(err);
            }
          }
        );

        proxyOptions.preHandler = app.authenticate;
      }

      app.register(fastifyHttpProxy, proxyOptions);
    }
  );
};
