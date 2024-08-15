import React, { useState } from "react";
import axios from "axios";
import { IoFilter, IoSearch } from "react-icons/io5";
import FilterStyles from "./SearchAndFilter.module.css";

const SearchAndFilter = ({ setResults }) => {
  const [searchInput, setSearchInput] = useState("");

  const fetchData = (value) => {
    fetch("http://localhost:5085/api/tags/")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((tag) => {
          return (
            value &&
            tag &&
            tag.tagName &&
            tag.tagName.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setSearchInput(value);
    fetchData(value);
  };

  // API to fetch the search results
  const onSearch = (searchTerm) => {
    setSearchInput(searchTerm)
    console.log("Search for: ", searchTerm);
  };

  return (
    <div className={FilterStyles.searchAndFilter}>
      <div className={FilterStyles.filterSection}>
        <input
          type="text"
          placeholder="Search for..."
          className={FilterStyles.searchBar}
          value={searchInput}
          onChange={(e) => handleChange(e.target.value)}
        />
        <IoSearch className={FilterStyles.searchIcon} />
        <div className={FilterStyles.filterBtn}>
          <button
            className={FilterStyles.filter}
            onClick={() => onSearch(searchInput)}
          >
            Filters
          </button>
          <IoFilter className={FilterStyles.filterIcon} />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
