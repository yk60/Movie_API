// Backend testing ( backend logic, models, and API endpoints )
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

  it("should update one movie", async () => {
    const updatedMovie = {
      title: "Frozen",
      genre: ["Fantasy"],
    };
    const res = await request(app)
      .put(`/movie/${newMovieId}`)
      .send(updatedMovie);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Frozen");
    expect(res.body.genre).toEqual(["Fantasy"]);
  });

  it("should delete one movie", async () => {
    const res = await request(app).delete(`/movie/${newMovieId}`);
    expect(res.statusCode).toBe(204);
  });

  it("should create multiple movies", async () => {
    const movies = [
      {
        title: "Test Movie 1",
        release_date: new Date().toISOString(),
        genre: ["Test", "Adventure"],
        description: "A movie created for testing.",
        poster_path: "/movie_placeholder.jpg",
      },
      {
        title: "Test Movie 2",
        release_date: new Date().toISOString(),
        genre: ["Test", "Fantasy"],
        description: "A movie created for testing.",
        poster_path: "/movie_placeholder.jpg",
      },
      {
        title: "Test Movie 3",
        release_date: new Date().toISOString(),
        genre: ["Test", "Comedy"],
        description: "A movie created for testing.",
        poster_path: "/movie_placeholder.jpg",
      },
    ];
    for (const movie of movies) {
      const res = await request(app)
        .post("/movie/")
        .send(movie)
        .set("Accept", "application/json");
      expect(res.statusCode).toBe(201);
    }
    const res = await request(app).get("/movie/");
    expect(res.body.length).toBe(3);
  });

  it("should delete all movies", async () => {
    let res = await request(app).delete("/movie/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("deletedCount");
    expect(res.body.deletedCount).toBe(3);
    res = await request(app).get("/movie/");
    expect(res.body.length).toBe(0);
  });
});
