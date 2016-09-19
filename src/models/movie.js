import axios from 'axios'

class MovieObj {
  constructor(title, year, movieId, overview, poster){
    this.attrs = []
    this.title = title
    this.year = year
    this.movieId = movieId
    this.overview = overview
    this.poster = poster
    // this.youtube = this.getYouTube(title).bind(this)
    this.getMovieInfo = this.getMovieInfo.bind(this)
    this.getMovieInfo(movieId)

    this.revenue = attrs[0]
    this.budget = attrs[1]
    this.imdb_id = attrs[2]
  }



  getYouTube(title){
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title.split(" ").join("+")}+trailer&key=AIzaSyDzIKgrZXiQZjPCJT1GcTEggK09QCYESw0`)
    .then(function(yt){
      return `http://www.youtube.com/embed/${yt.items[0].id.videoId}`
    })
  }

  getMovieInfo(movieId){
    debugger
    var that = this
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?&api_key=bcd69b485671c77289868b4acf21bcf0&append_to_results=imdb_id`)
    .then((response) => {
      debugger
      this.push(response.data.revenue)
      attrs.push(response.data.budget)
      attrs.push(response.data.imdb_id)
      return Promise.all(attrs)
    }.bind(this))
  }
}

export default MovieObj
