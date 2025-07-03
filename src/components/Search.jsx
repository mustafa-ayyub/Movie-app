import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src="/public/search.svg" />
        <input
          type="text"
          placeholder="Search through a thousand of movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        ></input>
      </div>
    </div>
  );
};

export default Search;
