import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToggle } from "../useToggle";
import Advsearch from "./Advsearch";

function Searchbar() {
  const [query, setQuery] = useState(""); // input in main searchbar
  const [showAdvSearch, toggle] = useToggle(false);
  const [genre, setGenre] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (location.pathname === "/movie") {
      setQuery("");
      setGenre("");
    }
  }, [location.pathname]);

  // build the url for navigation
  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      if (!query && !genre) {
        return;
      }
      let url = `/movie/search?`;
      if (query.trim()) {
        url += `query=${encodeURIComponent(query)}&`;
      }
      if (genre.trim()) {
        url += `genre=${encodeURIComponent(genre)}&`;
      }
      url = url.slice(0, -1);
      navigate(url);
    }
  };
  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Enter a movie title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleEnterPress}
      />
      <button onClick={toggle}>Advanced search</button>
      <br />
      {showAdvSearch && (
        <Advsearch
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{ marginLeft: "8px" }}
        />
      )}
    </div>
  );
}
export default Searchbar;
