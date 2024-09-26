import React from "react";
import Styles from "./SearchResult.module.css";

const SearchResult = ({ result, onTagClick }) => {
  return (
    <div
      className={Styles.searchReult}
      onClick={() => onTagClick(result.tagName)} 
    >
      {result.tagName}
    </div>
  );
};

export default SearchResult;
