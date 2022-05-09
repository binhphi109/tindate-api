import faker from "@faker-js/faker";
import { Types } from "mongoose";
import { UserModel } from "../../../src/models/User";

export const runSeed = async () => {
  await UserModel.create({
    _id: Types.ObjectId(),
    name: "Admin",
    birthDate: faker.date.betweens("1980-01-01T00:00:00.000Z", "2000-01-01T00:00:00.000Z")[0],
    avatar: faker.image.avatar(),
    createDate: new Date(),
    editDate: new Date(),
  });

  await UserModel.create({
    _id: Types.ObjectId(),
    name: "Owner",
    birthDate: faker.date.betweens("1980-01-01T00:00:00.000Z", "2000-01-01T00:00:00.000Z")[0],
    avatar: faker.image.avatar(),
    createDate: new Date(),
    editDate: new Date(),
  });

  await UserModel.create({
    _id: Types.ObjectId(),
    name: "Viewer",
    birthDate: faker.date.betweens("1980-01-01T00:00:00.000Z", "2000-01-01T00:00:00.000Z")[0],
    avatar: faker.image.avatar(),
    createDate: new Date(),
    editDate: new Date(),
  });
};
