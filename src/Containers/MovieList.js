import React, {Component} from 'react'
import { connect } from 'react-redux'

class MovieList extends Component {
  render(){
    var movies = this.props.movies
    var moviepanels = movies.map((movie, idx)=> {
      return <Movie key={idx} title={movie.title} year={movie.year} overview={movie.overview} poster={movie.poster} netmoney={movie.revenue - movie.budget} youtube={movie.youtubeLink} imdb={movie.imdbId}/>
    })
    return(
      <div>
        {moviepanels}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
      movies: state.movies
    }
  }

const SmartMovieList = connect(mapStateToProps)(MovieList)

export default SmartMovieList
