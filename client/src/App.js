import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'; import './App.css';
import Movie from './components/Movie';
import MovieDetail from './components/Movie_detail';
import Home from './components/Home';
function App() {
  const [movies, setMovies] = useState([]); // all movies in the db

  useEffect(() => {
    fetch('http://localhost:3000/movie/')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err));
  }, []);

  return (

    <div className="App">
      <h1>Movies</h1>
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route
          path="/movie"
          element={
            <>
              {movies.map(movie => (
                <Movie
                  key={movie._id}
                  _id={movie._id}
                  title={movie.title}
                  genre={movie.genre}
                  release_date={movie.release_date}
                />
              ))}
            </>
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>

    </div>


  );
}

export default App;