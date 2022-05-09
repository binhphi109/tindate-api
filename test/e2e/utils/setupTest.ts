import mongoose from "mongoose";
import "../../../src/core/express";
import db from "../../../src/core/mongoose";
import { runSeed } from "./seeder";

export const setupTestDB = async () => {
  beforeAll(async () => {
    await db.connect();

    // drop all collections
    const collections = await mongoose.connection.db.collections();
    collections.forEach((collection) => {
      mongoose.connection.dropCollection(collection.collectionName);
    });

    // init data
    await runSeed();
  });

  beforeEach(async () => {});

  afterAll(async () => {
    await db.disconnect();
  });
};
