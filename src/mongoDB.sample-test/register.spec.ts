const request = require("supertest");
const app = require("../app");
const { dbDisconnect } = require("../config/db.test.connection.config");

afterAll(async () => {
  await dbDisconnect();
});

describe("POST /register", () => {
  describe("given user email and role", () => {
    // should save user email role, and password to database
    // should respond with a json object containing the user id
    test("should respond with 200 status code", async () => {
      const response = await request(app)
        .post("/register")
        .send({ email: "oduye01.grace@gmail.com", role: "user" });
      expect(response.statusCode).toBe(200);
      expect(response._body.data.password).toBeDefined();
      expect(response._body).toHaveProperty("data");
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  }),
    describe("when user email and role is missing", () => {
      // respond with status code 403 message
      const body = {
        email: "",
        role: "",
      };
      test("should respond with a status code of 403", async () => {
        const response = await request(app).post("/register").send(body);
        expect(response.statusCode).toBe(403);
        expect(response._body.message).toBe("valid email is required");
      });
    });
});