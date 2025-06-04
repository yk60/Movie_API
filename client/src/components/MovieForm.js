import React, { useState } from "react";

function MovieForm() {
  const [formData, setFormData] = useState({
    title: "",
    release_date: "",
    genre: "",
    description: "",
  });

  // update specific field value from formdata, keeping everything else the same
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // add new movie to database by making a POST request
  const handleMovieAdd = () => {
    fetch("http://localhost:3000/movie/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "Learn React" }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <h1>Add a movie</h1>
      <form onSubmit={handleMovieAdd} class="movie-form">
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
        <input
          name="genre"
          type="String"
          placeholder="Enter movie genre:"
          required
          onChange={handleChange}
        ></input>
        <input
          name="description"
          type="String"
          placeholder="Enter movie description:"
          onChange={handleChange}
        ></input>
      </form>
      <p>{formData.title}</p>
      <p>{formData.genre}</p>
    </div>
  );
}
export default MovieForm;
