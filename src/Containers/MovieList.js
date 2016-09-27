import React, { Component } from 'react'
import { connect } from 'react-redux'
import Movie from '../Components/Movie'

class MovieList extends Component {


  render() {
    var movies = this.props.movies || []
    // movies.map((m) => {
    //   m.netmoney = m.revenue - m.budget
    //   fixMoney(m)
    //   debugger
    //   return m
    // })
    var moviepanels = movies.map((movie, idx) => {
      return <Movie key={idx} title={movie.title} year={movie.year} overview={movie.overview} poster={movie.poster} boxoffice={movie.boxOffice} styleColor={movie.styleColor} youtube={movie.youtubeLink} imdb_id={movie.imdb_id}/>
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
