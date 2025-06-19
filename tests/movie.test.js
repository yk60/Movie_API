// Backend testing
const request = require("supertest");
const app = require("../server");

const sampleMovieId = "6848b8f1b8f44fc158369d80";
// Test HTTPS endpoints for correct responses
describe("Test for Movie API", () => {
  it("should return all movies", async () => {
    const res = await request(app).get("/movie/");
    expect(res.statusCode).toBe(200); // check HTTP status
    expect(Array.isArray(res.body)).toBe(true); // check response is an array
  });

  it("should return a single movie", async () => {
    const res = await request(app).get(`/movie/${sampleMovieId}`);
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe("object");
  });
});
