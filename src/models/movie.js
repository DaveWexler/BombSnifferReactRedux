import axios from 'axios'

class MovieObj {
  constructor(title, year, movieId, overview, poster){
    this.attrs = []
    this.title = title
    this.year = year
    this.movieId = movieId
    this.overview = overview
    this.poster = poster
    this.youtube = this.getYouTube.bind(this)
    this.getMovieInfo = this.getMovieInfo.bind(this)
    this.getMovieInfo(movieId).then((resp)=>{
      this.getYouTube(resp.movieId).then(function(resp){
        this.youTubeURL = resp
      }.bind(this))
    })
  }



  getYouTube(title){
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title.split(" ").join("+")}+trailer&key=AIzaSyDzIKgrZXiQZjPCJT1GcTEggK09QCYESw0`)
    .then(function(yt){
      return `http://www.youtube.com/embed/${yt.items[0].id.videoId}`
    })
  }

  getMovieInfo(movieId){
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?&api_key=bcd69b485671c77289868b4acf21bcf0&append_to_results=imdb_id`)
    .then(function (response){
      this.revenue = response.data.revenue
      this.budget = response.data.budget
      this.imdb_id = response.data.imdb_id
      return this
    }.bind(this))
  }
}

export default MovieObj
