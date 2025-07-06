## API Endpoints

| Purpose                          | Method | Endpoint                              |
| -------------------------------- | ------ | ------------------------------------- |
| Get all movies                   | GET    | `/movies`                             |
| Get a movie by ID                | GET    | `/movies/:movieId`                    |
| Create a movie                   | POST   | `/movies`                             |
| Update a movie                   | PUT    | `/movies/:movieId`                    |
| Delete a movie                   | DELETE | `/movies/:movieId`                    |
| Search/filter movies             | GET    | `/movies?query={query}&genre={genre}` |
| Import movies from TMDb          | GET    | `/fetch-movies`                       |
| Get all users                    | GET    | `/users`                              |
| Get a user by ID                 | GET    | `/users/:userId`                      |
| Create a user                    | POST   | `/users`                              |
| Update a user                    | PUT    | `/users/:userId`                      |
| Delete a user                    | DELETE | `/users/:userId`                      |
| Add movie to user's history      | POST   | `/users/:userId/movies/:movieId`      |
| Remove movie from user's history | DELETE | `/users/:userId/movies/:movieId`      |
| Create a review                  | POST   | `/reviews`                            |
| Get a review by ID               | GET    | `/reviews/:reviewId`                  |
| Get all reviews by user          | GET    | `/users/:userId/reviews`              |
| Get all reviews for a movie      | GET    | `/movies/:movieId/reviews`            |
| Create a watchlist               | POST   | `/watchlists`                         |
| Get a watchlist by ID            | GET    | `/watchlists/:watchlistId`            |
| Get all watchlists               | GET    | `/watchlists`                         |
| Update a watchlist               | PUT    | `/watchlists/:watchlistId`            |
| Delete a watchlist               | DELETE | `/watchlists/:watchlistId`            |
