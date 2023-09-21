const request = require("supertest");
const app = require("../app");
const { dbDisconnect } = require("../config/db.test.connection.config");
let res01:any;

beforeAll(async () => {
  res01 = await request(app)
    .post("/register")
    .send({ email: "oduye01.grace@gmail.com", role: "user" });
  // should respond with a json object containing the user id as id
});

afterAll(async () => {
  await dbDisconnect();
});

describe("POST /login", () => {
  describe("given user email and role", () => {
    // should login user with email and password
    // should respond with a json object containing the user id as id
    test("should respond with 200 status code", async () => {
      const response = await request(app).post("/login").send({
        email: "oduye01.grace@gmail.com",
        password: res01._body.data.password,
      });

      expect(response.statusCode).toBe(200);
      expect(response._body.data.id).toBeDefined();
      expect(response._body).toHaveProperty("data");
      expect(response._body.data).toHaveProperty("token");
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
  describe("when user password is missing", () => {
    // respond with status code 403 message
    const body = {
      email: "oduye01.grace@gmail.com",
      password: "",
    };
    test("should respond with a status code of 403", async () => {
      const response = await request(app).post("/login").send(body);
      expect(response.statusCode).toBe(403);
      expect(response._body.message).toBe("password is required");
    });
  });
});


