import app from "./index.js";
import request from "supertest";
import path from "path";

describe("Multipart Form Data Request", () => {
  it("should send a multipart data request and should redirect too.", async () => {
    const response = await request(app)
      .post("/upload")
      .field("description", "test image")
      .attach("file", path.join(__dirname, "cn.png"));

    expect(response.statusCode).toEqual(302);
  });
});