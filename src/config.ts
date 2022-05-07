import "dotenv/config";
import path from "path";
import { getGlobbedPaths } from "./core/utils/path";

export default {
  app: {
    title: "Tinder API",
    version: "1.0.0",
    description: "",
  },
  port: 3000,
  mongodb: process.env.MONGO_CONNECTION || "",
  // Setting Globbed route files
  files: {
    routes: getGlobbedPaths(path.join(__dirname, "../routes/**/*.{ts,js}")),
    models: getGlobbedPaths(path.join(__dirname, "../models/**/*.{ts,js}")),
  },
};
