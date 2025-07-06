import React, { useEffect, useState } from "react";
import "./index.css";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { getTrendingMovies, updateSearchCount } from "../appwrite";
import { ClimbingBoxLoader } from "react-spinners";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (query = "", page = 1) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endPoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}&page=${page}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;
      const response = await axios.get(endPoint, API_OPTIONS);

      const data = response.data;
      console.log();
      console.log("Data is: ", data);

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch the Movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      setTotalPages(data.total_pages);
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
    fetchMovies(debounceValue, currentPage);
  }, [debounceValue, currentPage]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <div className="pattern">
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="hero-banner"></img>
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
              {console.log("Movie List: ", movieList)}
            </ul>
          )}
          <div className="pagination-buttons mt-4 flex gap-4 justify-center">
            <button
              className={`text-white font-medium rounded-full text-lg px-5 py-2.5 text-center mb-2 ${
                currentPage === 1
                  ? "bg-purple-400 cursor-not-allowed opacity-50"
                  : "bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700"
              } focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-white pt-2 text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-lg px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
