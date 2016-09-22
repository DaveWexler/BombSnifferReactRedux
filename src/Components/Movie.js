import React, { Component } from 'react'

class Movie extends Component {
  debugger
  render(){
    return(
      <div className="col-md-2 movies" id={this.props.movieId}>
        <div className="movieTitles">
          <a href={"http://www.imdb.com/title/" + this.props.imdb_id + "/"}>{this.props.title}</a>
          <h6>{this.props.year}</h6>
        </div>
        <div className="movieMoney">
          <h6>${this.props.netmoney}</h6>
        </div>
        <div className="moviePosters" id={this.props.youTubeURL}>
           <img src={this.props.poster} className="img-thumbnail" style={{width:150 + 'px', height: 150 + 'px'}} />
        </div>
        <div className="movieOverviews">
           <p>{this.props.overview}</p>
        </div>
      </div>
    )
  }
}

export default Movie
