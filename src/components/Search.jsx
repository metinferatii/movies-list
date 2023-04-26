import React, { useState } from 'react';

function Search(props) {
  return (
    <div>
      <input
        type="text"
        value={props.searchTerm}
        onChange={(e) => props.handleSearch(e.target.value)}
      />
      <button onClick={props.handleSearch}>Search</button>
    </div>
  );
}


export default Search;