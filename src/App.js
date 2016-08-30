import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="logo">
          <img src="bombsnifferlogo.png" />
        </div>
        <div className="search-bar">
          <SearchBar />
        </div>
        <div className="movie-list">
          <MovieList />
        </div>
        <div className="youtube-preview">
          <YoutubePreview />
        </div>
      </div>
    );
  }
}

export default App;
