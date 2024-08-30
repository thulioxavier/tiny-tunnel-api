import { FastifyRequest, FastifyReply } from "fastify";

export const auth = (request: FastifyRequest, reply: FastifyReply) => {
    const apiKey = request.headers["authorization"];
    const knownKey = process.env['']
};
