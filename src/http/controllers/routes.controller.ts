import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Routes } from "../../services";

export const CreateRouter = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
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

    request.log.info({ action: 'Route successfully created', output });

    reply.status(201).send(output);

  } catch (error) {
    request.log.error({ action: 'Route error created', error });

    if (error instanceof z.ZodError) {
      reply.status(400).send({
        error: 'Invalid input',
        message: 'One or more fields are invalid.',
        details: error.errors,
      });
    } else {
      reply.status(500).send({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred while creating the route.',
      });
    }
  }
};
