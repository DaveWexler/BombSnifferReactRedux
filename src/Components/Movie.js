inport React, {Component} from 'react'

class Movie extends Component {
  render(){
    return(
      <div class="col-md-2 movies" id=`"${this.props.movieId}"`>
        <div class="movieTitles">
          <a target="_blank" href=`"http://www.imdb.com/title/${this.props.imdbId}/"`>{this.props.title}</a>
          <h6>{this.props.year}</h6>
        </div>
        <div class="movieMoney">
          <h6>${this.props.netmoney}</h6>
        </div>
        <div class="moviePosters" id=`"${this.props.youtube}"`>
           <img src=`"${this.props.poster}"` class="img-thumbnail" id='poster' style="width:150px;height:150px">
           </a>
        </div>
        <div class="movieOverviews">
           <p>{this.props.overview}</p>
        </div>
      </div>
    )
  }
}
