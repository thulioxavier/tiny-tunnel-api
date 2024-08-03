import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyHttpProxy from "@fastify/http-proxy";
import { EndPointsRoutes } from "./routes";
import { join } from "path";
import fastifyStatic from "@fastify/static";
import { ProxyConfig } from "./proxy";

const app = fastify({
  logger: true,
});

app.register(cors, {
  origin: true,
});

app.register(fastifyStatic, {
  root: join(__dirname, "public"),
  prefix: "/",
});

app.register(EndPointsRoutes);

app.register(ProxyConfig);

// Inicia o servidor
export default app;
