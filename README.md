# Movie API

## Project Purpose

A full-stack movie database app built with the MERN stack, showcasing RESTful API development, database integration, and a dynamic UI with search, filtering, and pagination.

## Main Features

- **Automated Import:** Integrate external TMDb API into MongoDB.
- **RESTful API:** Supports full CRUD operations, advanced search, multi-genre filtering, and efficient pagination.
- **Modern React Frontend:** Browse, search, and manage movies with a responsive UI, paginated lists, and dynamic routing.

## Frontend setup

```bash
cd client
npm install
npm start
```

## Backend setup

```bash
cd backend
npm run dev
node server.js
```

To fetch new movies (optional)

```bash
http://localhost:3000/fetch-movies
```

## Data Migration

If you update the Mongoose schemas and want to ensure all existing documents have the new fields, run the migration script:

```bash
cd backend
node scripts/addMissingFields.js
```

## Run automated tests

```bash
cd backend
npm test
npm run test:all

```

## API Endpoints

For a complete list of API endpoints and details, see the [full API documentation](API.md).

| Purpose                          | Endpoint                              |
| -------------------------------- | ------------------------------------- |
| Get a movie by ID                | `/movies/:movieId`                    |
| List movies (paginated)          | `/movies?page={page}&limit={limit}`   |
| Search/filter movies (paginated) | `/movies?query={query}&genre={genre}` |
| Get a user by ID                 | `/users/:userId`                      |
