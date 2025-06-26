import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieForm(props) {
  const navigate = useNavigate();
  const movie_placeholder = "/movie_placeholder.jpg";

  const [formData, setFormData] = useState({
    title: "",
    release_date: "",
    genre: [String],
    description: "",
    poster_path: movie_placeholder,
  });

  // update specific field value from formdata, keeping everything else the same
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // update fields with multi select opiton
  const handleChangeMultiple = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Array.from(
        e.target.selectedOptions,
        (option) => option.text
      ),
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // store the File object
    setFormData({
      ...formData,
      [e.target.name]: file ? file.name : movie_placeholder,
    });
  };

  // add new movie to database by making a POST request
  const handleMovieAdd = (e) => {
    e.preventDefault(); // prevents form data from getting appended to url
    fetch("http://localhost:3000/movies/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        props.setPopupMsg("Added new movie");
        props.fetchMovies();
        navigate("/movies");

        props.toggle();
        console.log(data);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <h1>Add a movie</h1>
      <form onSubmit={handleMovieAdd} className="movie-form">
        <input
          name="title"
          type="String"
          placeholder="Enter movie title:"
          required
          onChange={handleChange}
        ></input>
        <input
          name="release_date"
          type="Date"
          placeholder="Enter movie release date:"
          required
          onChange={handleChange}
        ></input>

        <label for="genres">Select a genre:</label>
        <select
          id="genres"
          name="genre"
          size="4"
          multiple
          onChange={handleChangeMultiple}
          required
        >
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Animation">Animation</option>
          <option value="Comedy">Comedy</option>
        </select>

        <input
          name="description"
          type="String"
          placeholder="Enter movie description:"
          onChange={handleChange}
        ></input>
        <input
          name="poster_path"
          type="file"
          id="myFile"
          onChange={handleFileChange}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <p>{formData.title}</p>
      <p>{formData.genre}</p>
      <p>{formData.poster_path}</p>
    </div>
  );
}
export default MovieForm;
