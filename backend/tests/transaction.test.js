const request = require("supertest");
const app = require("../index");

describe("Transaction API Tests", () => {
  it("should execute a transaction", async () => {
    const res = await request(app)
      .post("/api/transactions/execute")
      .send({ amount: 10, type: "deposit" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("txHash");
  });
});

