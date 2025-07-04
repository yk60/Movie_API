import Watchlist from "./Watchlist";

function Watchlists({
  watchlists,
  setWatchlists,
  moviesSaved,
  setMoviesSaved,
}) {
  // filter out the deleted object
  const handleMovieunsave = (id) => {
    setMoviesSaved((prev) => prev.filter((movie) => movie._id !== id));
  };

  const handleCreate = () => {
    const name = prompt("Enter collection name:");

    if (!name) return;
    setWatchlists((prev) => [
      ...prev,
      {
        title: name,
        movies: [],
        handleMovieunsave: handleMovieunsave, // You can pass a real handler if needed
      },
    ]);
  };
  return (
    <div>
      <button onClick={handleCreate}>Create</button>
      <div className="watchlists">
        {watchlists ? (
          watchlists.map((pl, idx) => (
            <Watchlist
              key={pl.title || idx}
              title={pl.title}
              movies={pl.movies}
              handleMovieunsave={pl.handleMovieunsave}
            />
          ))
        ) : (
          <div>Create a new collection</div>
        )}
      </div>
    </div>
  );
}

export default Watchlists;
