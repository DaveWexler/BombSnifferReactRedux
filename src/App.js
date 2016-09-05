import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="logo">
          <img src="src/bombsnifferlogo.png" alt="logo"/>
        </div>
        <div className="search-bar">
          <SearchBar />
        </div>
        <div className="movie-list">
          <MovieList />
        </div>
        {/* <div className="youtube-preview">
          <YoutubePreview />
        </div> */}
      </div>
    );
  }
}

export default App;
