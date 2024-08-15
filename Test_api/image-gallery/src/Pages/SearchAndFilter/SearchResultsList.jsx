import React from "react";
import SearchResult from "./SearchResult";
import SearchStyles from "./SearchResultsList.module.css";

const SearchResultsList = ({ results }) => {
  return (
    <div className={SearchStyles.resultsList}>
      {results.map((result, tagID) => {
        return <SearchResult result={result} key={tagID} />;
      })}
    </div>
  );
};

export default SearchResultsList;
