import React, { useState, useEffect } from "react";
import axios from "../../utiles/axios";
import requests from "../../requests";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";

import Slider from "react-slick";

function Banner() {
  const [movies, setMovies] = useState([]);

  const settings = {
    dots: true,
    autoplay: true,
    lazyLoad: "ondemand",
    fade: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(requests.fetchNetflixOriginals);

      // const randomIndex = Math.floor(Math.random() * (data.results.length - 1));

      setMovies(data.results);
    }
    fetchData();
  }, []);

  return (
    <header className="header__banner">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div>
            <div
              className="banner"
              style={{
                backgroundSize: "cover",
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
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
            </div>
          </div>
        ))}
      </Slider>
    </header>
  );
}

export default Banner;
