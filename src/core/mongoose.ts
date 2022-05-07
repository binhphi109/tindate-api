/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import mongoose from "mongoose";
import path from "path";
import config from "../config";

export default {
  async connect() {
    config.files.models.forEach((modelPath) => {
      require(path.resolve(modelPath));
    });

    try {
      await mongoose.connect(config.mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });

      console.log("MongoDb database connected.");
    } catch (error) {
      console.error("Unable to connect to MongoDb database:", error);
    }
  },
  async disconnect() {
    await mongoose.disconnect();
  },
};
