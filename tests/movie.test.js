// Backend testing
process.env.NODE_ENV = "test";
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
let app;
let mongoServer;
let newMovieId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
  console.log("running on random port " + mongoServer.getUri());
  app = require("../server");
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
  await mongoServer.stop();
});

// Test HTTPS endpoints for correct responses
describe("Test for Movie API", () => {
  it("should return no movies initially", async () => {
    const res = await request(app).get("/movie/");
    expect(res.statusCode).toBe(200); // check HTTP status
    expect(Array.isArray(res.body)).toBe(true); // check response is an array
    expect(res.body.length).toBe(0);
  });

  it("should create a new movie", async () => {
    const newMovie = {
      title: "Test Movie",
      release_date: new Date().toISOString(),
      genre: ["Test", "Adventure"],
      description: "A movie created for testing.",
      poster_path: "/movie_placeholder.jpg",
    };
    const res = await request(app)
      .post("/movie/")
      .send(newMovie)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(typeof res.body).toBe("object");
    expect(res.body.title).toBe("Test Movie");
    expect(res.body.genre).toEqual(["Test", "Adventure"]);
    newMovieId = res.body._id;
  });

  it("should have one movie in the database after creation", async () => {
    const res = await request(app).get("/movie/");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it("should fetch one movie", async () => {
    const res = await request(app).get(`/movie/${newMovieId}`);
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe("object");
  });
});
