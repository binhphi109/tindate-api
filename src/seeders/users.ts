/* eslint-disable no-plusplus */
import { faker } from "@faker-js/faker";
import { UserModel, User } from "../models/User";
import mongoose from "../core/mongoose";

const items: User[] = [];
for (let i = 0; i < 15; i++) {
  items.push({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    birthDate: faker.date.betweens("1980-01-01T00:00:00.000Z", "2000-01-01T00:00:00.000Z")[0],
    avatar: faker.image.avatar(),
    createDate: new Date(),
    editDate: new Date(),
  });
}

mongoose.connect().then(async () => {
  await UserModel.insertMany(items);

  mongoose.disconnect();
});
