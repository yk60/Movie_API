function Advsearch({ value, onChange, style }) {
  const genres = [
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
      {genres.map((genre) => (
        <label key={genre} style={{ marginRight: "12px" }}>
          <input
            type="checkbox"
            value={genre}
            checked={value.includes(genre)}
            onChange={onChange}
          />
          {genre}
        </label>
      ))}
    </div>
  );
}
export default Advsearch;
