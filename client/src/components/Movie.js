import React from 'react';
import { useNavigate } from 'react-router-dom';

function Movie({ _id, title, genre, release_date }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/movie/${_id}`);
    };
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '8px 0',
            maxWidth: '400px'
        }} onClick={handleClick}>

            <h2 style={{ margin: '0 0 8px 0' }}>{title}</h2>
            <p style={{ margin: '4px 0' }}><strong>Genre:</strong> {genre}</p>
            <p style={{ margin: '4px 0' }}>
                <strong>Release Date:</strong> {release_date ? new Date(release_date).toLocaleDateString() : ''}
            </p>
        </div>
    );
}

export default Movie;