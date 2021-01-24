import "./SearchResults.css";
import { Link } from "react-router-dom";

export default function SearchResults({ searchResults }) {
  return (
    <div>
      {searchResults.map((result, index) => (
        <div key={index} className="result-container">
          <h2>{result.name}</h2>
          <Link
            target="_blank"
            className="result-link"
            to={{ pathname: `${result.urls[0].url}` }}
          >
            Learn More
          </Link>
        </div>
      ))}
    </div>
  );
}
