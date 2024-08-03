import app from "./app";

const start = async () => {
  try {
    await app.listen({
      port: 7000,
      host: "0.0.0.0",
    });
    app.log.info("HTTP Server Running [Mail Server] 🔥");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
