import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToggle } from "../useToggle";
import Advsearch from "./Advsearch";
import { buildMoviesUrl } from "../utils/Util";

function Searchbar({ page, limit, sort }) {
  const [query, setQuery] = useState(""); // input in main searchbar
  const [showAdvSearch, toggle] = useToggle(false);
  const [genre, setGenre] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (location.pathname === "/movies") {
      setQuery("");
      setGenre([]);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/movies" && showAdvSearch) {
      toggle();
    }
  }, [location.pathname]);

  useEffect(() => {
    console.log("current query", query);
    console.log("current genres", genre);
  }, [query, genre]);

  // build the url to update the address in address bar (frontend)
  const handleSearch = () => {
    page = 1;
    const url = buildMoviesUrl({ query, genre, page, limit, sort });
    navigate(url);
  };

  const handleGenreSelect = (e) => {
    const check = e.target.checked;
    const checkedGenre = e.target.value;

    if (check) {
      setGenre((prev) => [...prev, checkedGenre]);
    } else {
      setGenre(genre.filter((genre) => genre !== checkedGenre));
    }
  };

  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Enter a movie title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleEnterPress}
      />
      <button className="button-default" onClick={handleSearch}>
        <img
          src={"/Search.png"}
          alt="Search"
          style={{ width: "24px", height: "24px" }}
        ></img>
      </button>

      <button className="button-default" onClick={toggle}>
        Advanced search
      </button>

      {showAdvSearch && (
        <Advsearch
          style={{ marginLeft: "8px" }}
          onChange={handleGenreSelect}
          genre={genre}
        />
      )}
    </div>
  );
}
export default Searchbar;
