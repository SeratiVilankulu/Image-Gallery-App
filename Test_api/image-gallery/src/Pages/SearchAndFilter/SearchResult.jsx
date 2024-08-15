import React, { useState } from "react";
import Styles from "./SearchResult.module.css";

const SearchResult = ({ result }) => {
  const [searchInput, setSearchInput] = useState("");

  // API to fetch the search results
  const onSearch = (searchTerm) => {
    setSearchInput(searchTerm);
    console.log("Search for: ", searchTerm);
  };

  return (
    <div
      className={Styles.searchReult}
      onClick={() => onSearch(result.tagName)}
    >
      {result.tagName}
    </div>
  );
};

export default SearchResult;
