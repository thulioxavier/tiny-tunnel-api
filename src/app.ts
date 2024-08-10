import fastify from "fastify";
import cors from "@fastify/cors";
import { EndPointsRoutes } from "./routes";
import { join } from "path";
import fastifyStatic from "@fastify/static";
import { ProxyConfig } from "./proxy";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

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

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'API Documentation',
      description: 'API documentation using Swagger with Fastify',
      version: '1.0.0',
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

app.register(cors, {
  origin: true,
});

app.register(fastifyStatic, {
  root: join(__dirname, "public"),
  prefix: "/",
});

app.register(
  EndPointsRoutes,
  {
    prefix: '/tiny-tunnel'
  }
);

app.register(ProxyConfig);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
    app.log.error(error)
    reply.status(500).send({ ok: false })
  } else {
    reply.send(error)
  }
})

export default app;
