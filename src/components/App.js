import React, { useState, useEffect } from "react";
import './../App.css';
import Header from './Header';
import Search from './Search';
import Movie from './Movie';
import axios from 'axios';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=6981d6b";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    defaultSearch();
  }, []);

  const defaultSearch = () => {
    axios.get(MOVIE_API_URL)
      .then(res => {
        const response = res.data;
        setMovies(response.Search);
        setLoading(false);
      })
  }

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);
    if (searchValue) {
      axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
        .then(res => {
          const jsonResponse = res.data;
          if (jsonResponse.Response === "True") {
            setMovies(jsonResponse.Search);
            setLoading(false);
          } else {
            setErrorMessage(jsonResponse.Error);
            setLoading(false);
          }
        })
    } else {
      defaultSearch();
    }
  };


  return (
    <div className="App">
      <Header text="IMBD Movies" />
      <Search search={search} />
      <div className="container">
        <p className="intro">Sharing a few of our favourite movies</p>
        <div className="row">
          {loading && !errorMessage ? (
            <div className="loading">
              <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : errorMessage ? (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          ) : (
                movies.map((movie, index) => (
                  <Movie key={`${index}-${movie.Title}`} movie={movie} />
                ))
              )}
        </div>
      </div>
    </div>
  );
};

export default App;
