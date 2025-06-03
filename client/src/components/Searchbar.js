import { useState } from "react";

function Searchbar(props) {
  const [searchQuery, setsearchQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      // make GET request
      try {
        // use the received handler function to update searchQuery in the parent component
        props.handleMovieSearch(searchQuery);
        setsearchQuery(""); // reset input field after submit
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
    </div>
  );
}
export default Searchbar;
