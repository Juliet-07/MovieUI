import React, { useState, useEffect } from "react";
import image from "./assest/theater.jpg";
import "./App.css";

const PATH_BASE = "http://www.omdbapi.com/?i=tt3896198&apikey=fab8cb66";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const RECENT_PATH = "http://www.omdbapi.com/?i=tt3896198&apikey=fab8cb66&s";
const App = () => {
  const [result, setResult] = useState(null);
  const [search, setSearch] = useState("");
  const searchTopMovies = (result) => {
    setResult(result);
  };
  const getRecentMovies = () => {
    fetch(RECENT_PATH)
      .then((response) => response.json())
      .then((recent) => {
        return searchTopMovies(recent);
      });
  };
  const getTopMovies = (search) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${search}`)
      .then((response) => response.json())
      .then((result) => {
        return searchTopMovies(result);
      })
      .catch((err) => err);
  };
  useEffect(() => {
    getTopMovies();
  },[]);
  const onSearchChange = (event) => {
    setSearch({ search: event.target.value });
  };
  const onSearchSubmit = (e) => {
    e.preventDefault();
    getTopMovies(search);
  };
  return (
    <div className="container">
      <div className="header">
        <img src={image} className="image" alt="logo" />
        <div className="content">
          <p className="test">MyTestApp</p>
        </div>
        <div className="large">
          <p className="watch">
            Watch <br />
            something <br />
            incredible
          </p>
        </div>
      </div>
      <div className="inputDiv">
        <label>Search</label>
        <Search
          value={search}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        />
      </div>
      <div className="movieDiv">
        <p>Movie Category Name</p>
      </div>
      {/* {result && <Table list={result.hits} />} */}
    </div>
  );
};
const Search = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="container">
    <input type="text" value={value} onChange={onChange} />
  </form>
);

const Table = ({ list }) => (
  <div className="container">
    {list.map((item) => (
      <div className="card indigo lighten-4 center" key={item.objectID}>
        <span className="card-title">
          <a className="pink-text" href={item.url} >
            {item.title}
          </a>
        </span>
      </div>
    ))}
  </div>
);
export default App;
