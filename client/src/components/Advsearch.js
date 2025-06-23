function Advsearch({ onChange, style, genres }) {
  const genresList = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];

  return (
    <div className="advsearch-dropdown">
      <div id="genre-options">
        {genresList.map((genre) => (
          <label key={genre} style={{ marginRight: "12px" }}>
            <input
              type="checkbox"
              value={genre}
              checked={genres.includes(genre)}
              onChange={onChange}
            />
            {genre}
          </label>
        ))}
      </div>
    </div>
  );
}
export default Advsearch;
