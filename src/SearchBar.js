import React from "react";

function SearchBar(props) {
    return (
      <div className="searchbar">
        <form onSubmit={props.handleSubmit}>
          <label>
            Search by Name:
            <input
              type="text"
              value={props.value}
              onChange={props.handleOnChange}
            />
          </label>
        </form>
      </div>
    );
  }
export default SearchBar;