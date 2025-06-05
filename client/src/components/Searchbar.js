import { useState } from "react";
import { useToggle } from "../useToggle";

function Searchbar(props) {
  const [searchQuery, setsearchQuery] = useState("");
  const [showAdvSearch, toggle] = useToggle(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      // make GET request
      try {
        // use the received handler function to update searchQuery in the parent component
        props.handleMovieSearch(searchQuery);
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <div>
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
