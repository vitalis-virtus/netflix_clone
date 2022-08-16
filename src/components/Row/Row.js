import React, { useEffect, useState } from "react";
import axios from "../../utiles/axios";
import "./Row.css";

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w200";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }

    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__poster_large"}`}
            src={
              isLargeRow
                ? `${BASE_IMG_URL}${movie.poster_path}`
                : `${BASE_IMG_URL}${movie.backdrop_path}`
            }
            alt={`poster for ${movie.name}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
