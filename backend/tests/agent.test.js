const request = require("supertest");
const app = require("../index");

describe("AI Agent API Tests", () => {
  it("should create a new AI agent", async () => {
    const res = await request(app)
      .post("/api/agents/create")
      .send({ strategy: "Risk-adjusted", allocation: 50 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
  });
});

