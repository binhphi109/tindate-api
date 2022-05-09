import faker from "@faker-js/faker";
import supertest from "supertest";
import app from "../../../src/core/express";
import { User } from "../../../src/models/User";

export function generateFakeUser() {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    birthDate: faker.date.betweens("1980-01-01T00:00:00.000Z", "2000-01-01T00:00:00.000Z")[0],
    avatar: faker.image.avatar(),
  };
}

export async function createUser(userData: object): Promise<User> {
  const data = generateFakeUser();

  const request = supertest(app);
  const response = await request
    .post("/users")
    .send({
      ...data,
      ...userData,
    })
    .expect(200);

  return response.body;
}
