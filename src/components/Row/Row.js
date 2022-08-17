import React, { useEffect, useState } from "react";
import axios from "../../utiles/axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import { SiNetflix } from "react-icons/si";

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w200";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }

    fetchData();
  }, [fetchUrl]);

  const handleImageClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    }
    movieTrailer(movie?.name || movie?.original_name || movie?.title).then(
      (url) => {
        if (!url) {
          console.log("no trailers");
          return;
        }
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      }
    );
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => {
          return movie.backdrop_path ? (
            <img
              key={movie.id}
              onClick={() => {
                handleImageClick(movie);
              }}
              className={`row__poster ${isLargeRow && "row__poster_large"}`}
              src={
                isLargeRow
                  ? `${BASE_IMG_URL}${movie.poster_path}`
                  : `${BASE_IMG_URL}${movie.backdrop_path}`
              }
              alt={`poster for ${movie.name}`}
            />
          ) : (
            <div
              key={movie.id}
              className="row__poster"
              onClick={() => {
                handleImageClick(movie);
              }}
            >
              <SiNetflix
                style={{ height: "70px", width: "200px" }}
                color="#E50914"
              />
              <p style={{ textAlign: "center" }}>
                {movie?.name || movie?.title}{" "}
              </p>
            </div>
          );
        })}
      </div>

      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
