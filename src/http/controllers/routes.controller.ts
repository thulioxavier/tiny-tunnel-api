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
  });

  const { isAuth, jwtSecretsEnv, prefix, rewritePrefix, upstream } = schema.parse(
    request.body
  );

  const output = await Routes.Create({
    isAuth,
    jwtSecretsEnv,
    prefix,
    rewritePrefix,
    upstream,
  });

  request.log.info({ action: 'Route successfully created', output });

  reply.status(201).send(output);
};

export const GetAllRoutes = async (request: FastifyRequest,
  reply: FastifyReply) => {
  const output = await Routes.GetAllRoutes();

  reply.send(output);
}