import React from "react";
import SearchResult from "./SearchResult";
import SearchStyles from "./SearchResultsList.module.css";

const SearchResultsList = ({ results, onTagClick }) => {
  return (
    <div className={SearchStyles.resultsList}>
      {results.map((result, tagID) => (
        <SearchResult result={result} key={tagID} onTagClick={onTagClick} />
      ))}
    </div>
  );
};

export default SearchResultsList;
