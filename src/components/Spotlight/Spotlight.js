import "./Spotlight.css";
import { useState, useEffect } from "react";
import instance from "../../axios.js";
import SpotlightCard from "./SpotlightCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const { REACT_APP_API_KEY } = process.env;
let API_KEY = REACT_APP_API_KEY;

export default function Spotlight() {
  const [isloading, setLoading] = useState(true);
  const [spotlights, setSpotlights] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 925,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  useEffect(() => {
    async function getSpotlights() {
      const min = Math.floor(Math.random() * 1000);
      const max = min + 500;
      const offset = getRndInteger(min, max);

      console.log(offset);
      const heroes = await instance.get(
        `/public/characters?limit=100&offset=${offset}&apikey=${API_KEY}`
      );
      const results = heroes.data.data.results;

      const heroSpotlights = results.filter((result) => {
        const lastItem = result.thumbnail.path.substring(
          result.thumbnail.path.lastIndexOf("/") + 1
        );

        return result.description !== "" && lastItem !== "image_not_available";
      });

      const condensedSpotlights = [];

      for (let i = 0; i < heroSpotlights.length; i++) {
        if (i === 10) {
          break;
        }
        condensedSpotlights.push(heroSpotlights[i]);
      }

      setSpotlights(condensedSpotlights);
      setLoading(false);
    }

    getSpotlights();
  }, []);

  return (
    <div className="spotlights">
      {isloading ? (
        <h1>Loading...</h1>
      ) : (
        <Slider {...settings}>
          {spotlights.map((spotlight, index) => (
            <SpotlightCard key={index} character={spotlight} />
          ))}
        </Slider>
      )}
    </div>
  );
}
