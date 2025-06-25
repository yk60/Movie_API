import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToggle } from "../useToggle";
import Advsearch from "./Advsearch";

function Searchbar() {
  const [query, setQuery] = useState(""); // input in main searchbar
  const [showAdvSearch, toggle] = useToggle(false);
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (location.pathname === "/movie") {
      setQuery("");
      setGenres([]);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/movie" && showAdvSearch) {
      toggle();
    }
  }, [location.pathname]);

  useEffect(() => {
    console.log("current genres", genres);
  }, [genres]);

  // build the url for navigation
  const handleSearch = () => {
    if (!query && !genres) {
      return;
    }
    let url = `/movie/search?`;
    if (query.trim()) {
      url += `query=${encodeURIComponent(query)}&`;
    }
    if (genres) {
      genres.map((genre, index) => {
        url += `genre=${encodeURIComponent(genre)}&`;
      });
    }
    url = url.slice(0, -1);
    navigate(url);
  };

  const handleGenreSelect = (e) => {
    const check = e.target.checked;
    const checkedGenre = e.target.value;

    if (check) {
      setGenres((prev) => [...prev, checkedGenre]);
    } else {
      setGenres(genres.filter((genre) => genre !== checkedGenre));
    }
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
          src={"/Search.png"}
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
          style={{ marginLeft: "8px" }}
          onChange={handleGenreSelect}
          genres={genres}
        />
      )}
    </div>
  );
}
export default Searchbar;
