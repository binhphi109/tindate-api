import supertest from "supertest";
import { Types } from "mongoose";
import app from "../../../src/core/express";
import { setupTestDB } from "../utils/setupTest";
import { createUser } from "../fixtures/users";

setupTestDB();

describe("api/users", () => {
  test("POST: / should create user successful", async () => {
    const data = {
      name: "Test User Create",
      birthDate: new Date(),
      avatar: "http://image-url.com",
    };

    const request = supertest(app);
    const response = await request.post("/users").send(data).expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.name).toEqual(data.name);
  });

  test("POST: / should return 400 when name missing", async () => {
    const data = {
      birthDate: new Date(),
      avatar: "http://image-url.com",
    };

    const request = supertest(app);

    await request.post("/users").send(data).expect(400);
  });

  test("GET: / should return list of users", async () => {
    // Create user
    await createUser({});

    const request = supertest(app);
    const response = await request.get("/users").expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body).toHaveLength(5);
  });

  test("GET: /:userId should return user by id", async () => {
    // Create user
    const createdUser = await createUser({});

    const request = supertest(app);
    const response = await request
      .get(`/users/${createdUser._id}`)

      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.name).toEqual(createdUser.name);
  });

  test("PUT: /:userId should update user successfully", async () => {
    // Create user
    const createdUser = await createUser({});

    const data = {
      name: "Test User Update",
      birthDate: new Date(),
      avatar: "http://image-url.com",
    };

    const request = supertest(app);
    const response = await request
      .put(`/users/${createdUser._id}`)

      .send(data)
      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.name).toEqual(data.name);
  });

  test("PUT: /:userId should return 404 when userId not existed", async () => {
    const data = {
      name: "Test User Update",
      birthDate: new Date(),
      avatar: "http://image-url.com",
    };

    const request = supertest(app);

    await request
      .put(`/users/${Types.ObjectId()}`)

      .send(data)
      .expect(404);
  });

  test("DELETE: /:userId should delete user successfully", async () => {
    // Create user
    const createdUser = await createUser({});

    const request = supertest(app);
    const response = await request
      .delete(`/users/${createdUser._id}`)

      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.success).toEqual(true);
  });

  test("DELETE: /:userId should return 404 when userId not existed", async () => {
    const request = supertest(app);

    await request
      .delete(`/users/${Types.ObjectId()}`)

      .expect(404);
  });
});
