import React, { Component } from 'react'
import { connect } from 'react-redux'
import Movie from '../Components/Movie'

class MovieList extends Component {
  render() {
    var movies = this.props.movies || []
    movies.forEach((m) => {
      m.netmoney = m.revenue - m.budget
    })
    var moviepanels = movies.map((movie, idx) => {
      return <Movie key={idx} title={movie.title} year={movie.year} overview={movie.overview} poster={movie.poster} netmoney={movie.netmoney} youtube={movie.youtubeLink} imdb={movie.imdbId}/>
    })
    return (
      <div>
        {moviepanels}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
      movies: state.actorSearch.movies
    }
  }

const SmartMovieList = connect(mapStateToProps)(MovieList)

export default SmartMovieList
