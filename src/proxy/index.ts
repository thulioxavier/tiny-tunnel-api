import fastifyHttpProxy from "@fastify/http-proxy";
import { Routes } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { dbClient } from "../config/database/client";

export const ProxyConfig = async (app: FastifyInstance) => {
  const proxies: Routes[] | [] = (await dbClient.routes.findMany()) ?? [];

  proxies.forEach(({ upstream, prefix, rewritePrefix, httpMethods }) => {
    app.register(fastifyHttpProxy, {
      upstream,
      prefix,
      rewritePrefix,
      httpMethods: JSON.parse(httpMethods),
    });
  });
};
