const { truncate } = require("lodash");
const request = require("supertest");
const app = require("./app");

describe("Get products", () => {
  it("should get products", async () => {
    await request(app).get("/get-products").expect(200);
  });
});

describe("Post username and password", () => {
  it("should return { isAccess: false, isAdmin: false } if wrong password", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        name: "Client",
        password: "wrong password",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
    expect(response).toHaveProperty("body", {
      isAccess: false,
      isAdmin: false,
    });
  });
  it("should return { isAccess: true, isAdmin: false } if right password", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        name: "Client",
        password: "Client",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
    expect(response).toHaveProperty("body", {
      isAccess: true,
      isAdmin: false,
    });
  });
});
