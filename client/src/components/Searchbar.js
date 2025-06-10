import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../useToggle";

function Searchbar() {
  const [searchQuery, setsearchQuery] = useState("");
  const [showAdvSearch, toggle] = useToggle(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      navigate(`/movie/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Enter a movie title"
        onChange={(e) => setsearchQuery(e.target.value)}
        onKeyUp={handleEnterPress}
      />
      <button onClick={toggle}>Advanced search</button>
      <br />
      {showAdvSearch && <input type="text" placeholder="Enter genre"></input>}
    </div>
  );
}
export default Searchbar;
