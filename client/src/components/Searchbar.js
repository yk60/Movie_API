import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../useToggle";

function Searchbar() {
  const [query, setQuery] = useState(""); // input in main searchbar
  const [showAdvSearch, toggle] = useToggle(false);
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
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
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleEnterPress}
      />
      <button onClick={toggle}>Advanced search</button>
      <br />
      {showAdvSearch && (
        <input
          type="text"
          placeholder="Enter genre"
          onChange={(e) => setGenre(e.target.value)}
          onKeyUp={handleEnterPress}
        ></input>
      )}
    </div>
  );
}
export default Searchbar;
