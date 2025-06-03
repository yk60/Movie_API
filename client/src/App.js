import React, { useEffect, useState } from 'react';
import { Router, Routes, Route } from 'react-router-dom'; import './App.css';
import Movie from './components/Movie';
import MovieDetail from './components/Movie_detail';
import Home from './components/Home';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import { useNavigate } from 'react-router-dom';

function App() {
  const [movies, setMovies] = useState([]); // all movies in the db
  const [users, setUsers] = useState([]) // all users
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/movie/')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err));
  }, []);

  const handleHomeClick = () => {
    navigate('/');
  }

  return (

    <div className="App">
      <h1 onClick={handleHomeClick}>Welcome to Movies API</h1>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movie"
          element={
            <div className='movie-list'>
              {movies.map(movie => (
                <Movie
                  key={movie._id}
                  _id={movie._id}
                  title={movie.title}
                  genre={movie.genre}
                  release_date={movie.release_date}
                />
              ))}
            </div>
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route
          path="/profile"
          element={<Profile />} />
      </Routes>


    </div>


  );
}

export default App;