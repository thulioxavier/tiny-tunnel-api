import fastify from "fastify";
import cors from "@fastify/cors";
import { EndPointsRoutes } from "./routes";
import { join } from "path";
import fastifyStatic from "@fastify/static";
import { ProxyConfig } from "./proxy";

const app = fastify({
  logger: {
    transport: {
      targets: [
        {
          level: 'info',
          target: 'pino/file',
          options: {
            destination: './logs/info.log',
            mkdir: true,
            interval: '1d',
            size: '10M'
          }
        },
        {
          level: 'error',
          target: 'pino/file',
          options: {
            destination: './logs/error.log',
            mkdir: true,
            interval: '1d',
            size: '10M'
          }
        }
      ]
    }
  }
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

export default app;
