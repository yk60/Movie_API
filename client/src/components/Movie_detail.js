import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Movie_detail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/movie/${id}`)
            .then(res => res.json())
            .then(data => setMovie(data))
            .catch(err => console.error(err));
    }, [id]); // runs once or whenever id changes

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movie-card">
            <h1>{movie.title}</h1>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Release Date:</strong> {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : ''}</p>
        </div>
    );
}

export default Movie_detail;