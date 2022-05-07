import "dotenv/config";
import http from "http";
import config from "./config";
import mongoose from "./core/mongoose";
import app from "./core/express";

mongoose.connect().then(() => {
  const server = new http.Server(app);

  server.listen(config.port, () => {
    console.log(`${config.app.title} started - Port: ${config.port}`);
  });
});
