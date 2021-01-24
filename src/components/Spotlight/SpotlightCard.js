import "./Spotlight.css";

import React from "react";
import { Link } from "react-router-dom";

export default function SpotlightCard({ character }) {
  const { name, description, thumbnail, urls } = character;

  const maxLength = 175;

  function fitOverview(max, text) {
    return text?.length > max ? text.substring(0, maxLength) + "..." : text;
  }

  return (
    <div className="hero-container">
      <div className="heroCard">
        <figure className="front">
          <img src={`${thumbnail.path}.${thumbnail.extension}`} alt="name" />
        </figure>

        <figure className="back">
          <h3>{name}</h3>

          <p>{fitOverview(maxLength, description)}</p>
          <Link
            target="_blank"
            className="spotlight-link"
            to={{ pathname: `${urls[0].url}` }}
          >
            Learn More
          </Link>
        </figure>
      </div>
    </div>
  );
}
