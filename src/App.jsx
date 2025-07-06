import React, { useEffect, useState } from "react";
import "./index.css";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "use-debounce";
import { getTrendingMovies, updateSearchCount } from "../appwrite";
import { fetchMovies } from "../Utility/appWriteUtility";
import PaginationButton from "./components/PaginationButton";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [debounceValue] = useDebounce(searchTerm, 1000);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMovies = async (query = "", page = 1) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await fetchMovies(query, page);

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
    loadMovies(debounceValue, currentPage);
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
            <PaginationButton  label="Previous" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
            <span className="text-white pt-2 text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <PaginationButton label="Next" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
