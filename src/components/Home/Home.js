import "./Home.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../../images/logo.jpg";
import shield from "../../images/shield.png";
import arrow from "../../images/downArrow.png";

import heroSearch from "../../images/heroSearch.png";
import heroes from "../../images/heroes.jpg";
import bg from "../../images/comicsBg.jpeg";
import { useState } from "react";
import instance from "../../axios.js";
import Spotlight from "../Spotlight/Spotlight";

import SearchResults from "../SearchResults/SearchResults";
import Parallax from "react-rellax";

const { REACT_APP_API_KEY } = process.env;

export default function Home() {
  const [query, setQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const findHeroes = async (e) => {
    console.log(query);
    const heroes = await instance.get(
      `/public/characters?nameStartsWith=${query}&limit=50&apikey=${REACT_APP_API_KEY}`
    );
    const results = heroes.data.data.results;

    setSearchResults(results);
  };

  return (
    <div>
      <section id="landing" style={{ backgroundImage: `url(${heroes})` }}>
        <div className="landing-content">
          <Parallax speed={7}>
            <nav>
              <ul>
                <li>
                  <HashLink to="#search" className="navLink">
                    Learn More
                  </HashLink>
                </li>
                <li>
                  <Link to={{ pathname: "http://marvel.com" }} target="_blank">
                    <img src={logo} alt="MARVEL" className="nav-logo" />
                  </Link>
                </li>
              </ul>
            </nav>
          </Parallax>

          <div className="call2">
            <Parallax speed={4}>
              <h1 className="landing-h1-1">Learn about the</h1>
            </Parallax>
            <Parallax speed={-4}>
              <h1 className="landing-h1-2">
                World's <span>GREATEST</span> Heroes
              </h1>
            </Parallax>

            <div className="scroll-indicator">
              <Parallax speed={4}>
                <img className="shield" src={shield} alt="SCROLL" />
                <img src={arrow} className="arrow" alt="Scroll" />
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      <section id="spotlights" style={{ backgroundImage: `url(${bg})` }}>
        <div className="spotlight-container">
          <h2>Today's Character Spotlights</h2>
          <Spotlight />
        </div>
      </section>

      <section id="search">
        <div className="search-container">
          <div className="search-contents">
            <img src={heroSearch} alt="HERO SEARCH" />
            <label htmlFor="heroSearch">Enter a character</label>
            <input
              type="text"
              name="heroSearch"
              id="heroSearch"
              onChange={(e) => setQuery(e.target.value)}
            />

            <button type="submit" onClick={findHeroes}>
              Search
            </button>

            {searchResults && <SearchResults searchResults={searchResults} />}
          </div>
        </div>
      </section>
      <section id="footer">
        <img src={logo} className="footer-logo" alt="MARVEL" />
        <Link
          to={{ pathname: "http://marvel.com" }}
          target="_blank"
          className="navLink"
        >
          <p>Data provided by Marvel. © 2014 Marvel</p>
        </Link>
      </section>
    </div>
  );
}
