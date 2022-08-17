import React, { useCallback, useEffect, useState } from "react";
import "./Navbar.css";
import { FaUserAstronaut } from "react-icons/fa";

function Navbar() {
  const [show, setShow] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://image.tmdb.org/t/p/w200/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
        alt="Netflix logo"
      />
      <div className="nav__avatar">
        <FaUserAstronaut color="#E50914" />
      </div>
    </div>
  );
}

export default Navbar;
