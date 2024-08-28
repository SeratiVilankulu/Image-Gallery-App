import React, { useState } from "react";
import { IoFilter, IoSearch } from "react-icons/io5";
import FilterStyles from "./SearchAndFilter.module.css";

const SearchAndFilter = ({
  searchInput,
  setSearchInput,
  setResults,
  onTagClick,
  setShowResults,
}) => {
  const fetchData = (value) => {
    fetch("http://localhost:5085/api/tags")
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

  const handleFilterClick = () => {
    onTagClick(searchInput);
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
          onClick={() => {setShowResults(true)}}
        />
        <IoSearch className={FilterStyles.searchIcon} />
        <div className={FilterStyles.filterBtn}>
          <button className={FilterStyles.filter} onClick={handleFilterClick}>
            Filters
          </button>
          <IoFilter className={FilterStyles.filterIcon} />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
