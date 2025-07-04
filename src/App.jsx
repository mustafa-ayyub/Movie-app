import React, { useEffect, useState } from "react";
import "./index.css";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import axios from 'axios';
import { useDebounce } from "use-debounce";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [debounceValue] = useDebounce(searchTerm, 1000)

const fetchMovies = async (query = '') => {
  setIsLoading(true);
  setErrorMessage("");

  try {
    const endPoint = query ?  `${API_BASE_URL}/search/movie?query=${encodeURI(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await axios.get(endPoint, API_OPTIONS);

    const data = response.data;
    console.log(data);

    if (data.Response === "False") {
      setErrorMessage(data.Error || "Failed to fetch the Movies");
      setMovieList([]);
      return;
    }

    setMovieList(data.results || []);
  } catch (error) {
    console.error("Error fetching movies:", error);
    setErrorMessage("Error Fetching Movies, Please try again later.");
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    fetchMovies(debounceValue);
  }, [debounceValue]);

  return (
    <div className="pattern">
      <div className="wrapper">
        <header>
          <img src="/public/hero.png" alt="hero-banner"></img>
          <h1>
            Find <span className="text-gradient">Movies</span> which you'll
            Enjoy without hustle
          </h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          ></Search>
        </header>
        <section className="all-movies">
          <h2 className="mt-[4 0px]">All Movies</h2>
          {isloading ? (<p className="text-white">Loading...</p>) : errorMessage ? (<p className="text-red-500">{errorMessage}</p>) : (<ul>
            {movieList.map((movie)=> (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>) }
        </section>
      </div>
    </div>
  );
};

export default App;