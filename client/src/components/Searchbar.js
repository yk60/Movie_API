import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToggle } from "../useToggle";
import Advsearch from "./Advsearch";

function Searchbar() {
  const [query, setQuery] = useState(""); // input in main searchbar
  const [showAdvSearch, setShowAdvSearch, toggle] = useToggle(false);
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

  useEffect(() => {
    if (location.pathname !== "/movie") {
      setShowAdvSearch(false);
    }
  }, [location.pathname]);

  // build the url for navigation
  const handleSearch = () => {
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
  };

  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      handleSearch();
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
      <button className="button-default" onClick={handleSearch}>
        <img
          src={"Search.png"}
          alt="Search"
          style={{ width: "24px", height: "24px" }}
        ></img>
      </button>

      <button
        onClick={toggle}
        style={{
          position: "absolute",
          top: "50%",
          right: "250px",
          transform: "translateY(-50%)",
        }}
      >
        Advanced search
      </button>

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
