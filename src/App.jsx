import React, { useEffect, useState } from "react";
import "./index.css";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { getTrendingMovies, updateSearchCount } from "../appwrite";

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
  const [debounceValue] = useDebounce(searchTerm, 1000);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endPoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await axios.get(endPoint, API_OPTIONS);

      const data = response.data;
      console.log(data);

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch the Movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error Fetching Movies, Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(debounceValue);
  }, [debounceValue]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

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
        <section className="trending">
          <h2>Trending Movies</h2>
          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.title}></img>
              </li>
            ))}
          </ul>
        </section>
        <section className="all-movies">
          <h2 className="mt-[4 0px]">All Movies</h2>
          {isloading ? (
            <p className="text-white">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
