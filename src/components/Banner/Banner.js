import React, { useState, useEffect } from "react";
import axios from "../../utiles/axios";
import requests from "../../requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(requests.fetchNetflixOriginals);

      const randomIndex = Math.floor(Math.random() * (data.results.length - 1));

      setMovie(data.results[randomIndex]);
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <p className="banner__description">{movie?.overview}</p>
      </div>

      <div className="banner__fadeBottom" />
    </header>
  );
}

export default Banner;
