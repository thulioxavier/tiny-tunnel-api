import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Routes } from "../../services";

export const CreateRouter = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {

  const schema = z.object({
    upstream: z.string().url(),
    rewritePrefix: z.string(),
    prefix: z.string(),
    isAuth: z.boolean(),
    jwtSecretsEnv: z.string(),
    httpMethods: z.array(z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD']))
  });

  const { isAuth, jwtSecretsEnv, prefix, rewritePrefix, upstream, httpMethods } = schema.parse(
    request.body
  );

  const output = await Routes.Create({
    isAuth,
    jwtSecretsEnv,
    prefix,
    rewritePrefix,
    upstream,
    httpMethods: JSON.stringify(httpMethods)
  });

  request.log.info({ action: 'Route successfully created', output });

  reply.status(201).send(output);
};

export const GetAllRoutes = async (request: FastifyRequest,
  reply: FastifyReply) => {
  const output = await Routes.GetAllRoutes();

  reply.send(output);
}