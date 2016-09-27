import axios from 'axios'

class MovieObj {
  constructor(title, year, movieId, overview, poster){
    this.title = title
    this.year = year
    this.movieId = movieId
    this.overview = overview
    this.poster = poster
    this.getMovieInfo = this.getMovieInfo.bind(this)
    this.getYouTube = this.getYouTube.bind(this)
    this.fixMoney = this.fixMoney.bind(this)
    // this.getMovieInfo(movieId)
    // this.youtube(title)
  }

  getYouTube(title){
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title.split(" ").join("+")}+trailer&key=AIzaSyDzIKgrZXiQZjPCJT1GcTEggK09QCYESw0`)
    .then(function(yt){
      this.youTubeURL = `http://www.youtube.com/embed/${yt.data.items[0].id.videoId}`
      return this
    }.bind(this))
  }

  getMovieInfo(movieId){
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?&api_key=bcd69b485671c77289868b4acf21bcf0&append_to_results=imdb_id`)
    .then(function (response){
      this.netMoney = response.data.revenue - response.data.budget
      this.imdb_id = response.data.imdb_id
      return this
    }.bind(this))
  }

  fixMoney(netMoney){
    var moneyString = netMoney.toString().split("")
    if (moneyString[0] === "-"){moneyString.shift()}
    let j = moneyString.length
    for (var i = j - 1; i >= 0; i--){
      if((j - i) % 3 === 0 && moneyString[i] != ","){
        moneyString.splice(i, 0, ",")
      }
    }
    moneyString = moneyString.join("")
    if(netMoney < 0) {
      var phrase = "Profit: "
      this.styleColor = "green"
      this.boxOffice = phrase + "$" + moneyString
    }
    else {
      var phrase = "Loss: "
      this.styleColor = "red"
      this.boxOffice = phrase + "$" + moneyString
    }
    return this
  }
}

export default MovieObj
