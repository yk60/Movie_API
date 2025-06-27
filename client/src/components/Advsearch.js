function Advsearch({ onChange, style, genre }) {
  // genre = list of selected
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
        {genresList.map((g) => (
          <label key={g} style={{ marginRight: "12px" }}>
            <input
              type="checkbox"
              value={g}
              checked={genre.includes(g)}
              onChange={onChange}
            />
            {g}
          </label>
        ))}
      </div>
    </div>
  );
}
export default Advsearch;
