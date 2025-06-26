// Backend testing ( backend logic, models, and API endpoints )
process.env.NODE_ENV = "test";
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
let app;
let mongoServer;
let movieIds = [];

// global setup: runs once before all tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "Family" });
  app = require("../server");
});

// runs before every test (clear then reinitialize db)
beforeEach(async () => {
  await mongoose.connection.db.collection("movies").deleteMany({});
  movieIds = [];
  console.log("running on random port " + mongoServer.getUri());
  const movies = [
    {
      title: "Test Movie 1",
      release_date: new Date().toISOString(),
      genre: ["Family", "Fantasy"],
      description: "A movie created for testing.",
      poster_path: "/movie_placeholder.jpg",
    },
    {
      title: "Test Movie 2",
      release_date: new Date().toISOString(),
      genre: ["Family", "Fantasy"],
      description: "A movie created for testing.",
      poster_path: "/movie_placeholder.jpg",
    },
    {
      title: "Test Movie 3",
      release_date: new Date().toISOString(),
      genre: ["Family", "Comedy"],
      description: "A movie created for testing.",
      poster_path: "/movie_placeholder.jpg",
    },
  ];
  for (const movie of movies) {
    const res = await request(app)
      .post("/movies/")
      .send(movie)
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(201);
    movieIds.push(res.body._id);
  }
  const res = await request(app).get("/movies/");
  expect(res.body.length).toBe(3);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
  await mongoServer.stop();
});

// Test HTTPS endpoints for correct responses
describe("Test basic CRUD operations", () => {
  it("should create a new movie", async () => {
    const newMovie = {
      title: "Test Movie 4",
      release_date: new Date().toISOString(),
      genre: ["Family", "Adventure"],
      description: "A movie created for testing.",
      poster_path: "/movie_placeholder.jpg",
    };
    let res = await request(app)
      .post("/movies/")
      .send(newMovie)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201); // check HTTP status
    expect(typeof res.body).toBe("object");
    expect(res.body.title).toBe("Test Movie 4");
    expect(res.body.genre).toEqual(["Family", "Adventure"]);

    res = await request(app).get("/movies/");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(4);
  });

  it("should fetch one movie", async () => {
    const firstMovieId = movieIds[0];
    const res = await request(app).get(`/movies/${firstMovieId}`);
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.title).toBe("Test Movie 1");
  });

  it("should update one movie", async () => {
    const firstMovieId = movieIds[0];
    const updatedMovie = {
      title: "Frozen",
      genre: ["Fantasy"],
    };
    const res = await request(app)
      .put(`/movies/${firstMovieId}`)
      .send(updatedMovie);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Frozen");
    expect(res.body.genre).toEqual(["Fantasy"]);
  });
});
describe("Test search operations", () => {
  it("should return all movies with single genre match", async () => {
    const res = await request(app).get("/movies?").query({ genre: "Fantasy" });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    res.body.forEach((movie) => {
      expect(movie.genre).toContain("Fantasy");
    });
  });

  it("should return all movies with multiple genres match", async () => {
    const res = await request(app)
      .get("/movies?")
      .query({ genre: ["Fantasy", "Family"] });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    res.body.forEach((movie) => {
      expect(movie.genre).toEqual(
        expect.arrayContaining(["Fantasy", "Family"])
      );
    });
  });
  it("should result in not found", async () => {
    const res = await request(app).get("/movies?").query({ genre: "Romance" });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });
});

describe("Test delete operations", () => {
  it("should delete one movie", async () => {
    const firstMovieId = movieIds[0];
    let res = await request(app).delete(`/movies/${firstMovieId}`);
    expect(res.statusCode).toBe(204);

    // should fetch no movie given nonexisting id
    res = await request(app).get(`/movies/${firstMovieId}`);
    expect(res.statusCode).toBe(404);
  });

  it("should delete all movies", async () => {
    let res = await request(app).delete("/movies/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("deletedCount");
    expect(res.body.deletedCount).toBe(3);
    res = await request(app).get("/movies/");
    expect(res.body.length).toBe(0);
  });
});
