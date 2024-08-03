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
    jwtSecrets: z.string(),
  });

  const { isAuth, jwtSecrets, prefix, rewritePrefix, upstream } = schema.parse(
    request.body
  );

  const output = await Routes.Create({
    isAuth,
    jwtSecrets,
    prefix,
    rewritePrefix,
    upstream,
  });

  reply.send(output);
};
