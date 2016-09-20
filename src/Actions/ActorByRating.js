import $ from 'jquery'
import axios from 'axios'
import MovieObj from '../models/movie'

var personID

function actorByRating(UserInput) {
  // searchActors().then(getMovies)
  // var request = bottomFive(movies)
  // console.log(request)
  // bottomFive(filterMovies(getMovieInfo(getYouTube(getMovies(searchActors())))))/
  const getMovies = searchActors()
  .then(function(response){
    const actorId = response.data.results[0].id
    return actorId
  })
  .then((personID) => {
    return getMoviesFromPersonID(personID)
  })
  .then(function(response) {
    var movieList = response.data.results.map((m) => {
      var poster_path = "http://image.tmdb.org/t/p/w500" + m.poster_path;
      var movie = new MovieObj(m.title, m.release_date.split("-")[0], m.id, m.overview, poster_path);
      return movie.getYouTube(movie.title).then((movie)=>{
        return movie.getMovieInfo(movie.movieId).then((movie)=>{
          return movie
        })
      })
    })
    return Promise.all(movieList)
  }).then((movieList) => {
    var fmovies = movieList.filter(filterMovies)
    var result = fmovies.slice(0,5)
    return result
  }).then((movies) => {
    return {
      type: "ACTOR_BY_RATING",
      payload: movies
    }
  })

  function searchActors() {
    return axios.get(`https://api.themoviedb.org/3/search/person?query=${UserInput}&api_key=bcd69b485671c77289868b4acf21bcf0`)
  }

  function getMoviesFromPersonID(id) {
    return axios.get(`https://api.themoviedb.org/3/discover/movie?with_cast=${id}&vote_count.gte=20&sort_by=vote_average.asc&budget.desc&api_key=bcd69b485671c77289868b4acf21bcf0&include_image_language=en`)
    // return movies
  }

  function filterMovies(m) {
    return (m.poster.split("/").pop() !== "w500null" && parseInt(m.year) < 2016 && m.revenue !== 0)
  }

  return getMovies
}

export default actorByRating
  // function saveMovie(movie){
  //   movies.push(movie)
  // }
//-----------helpers to get all required attrs for movie below------------
  // function getMovieInfo(movie){
  //   return axios.get(`https://api.themoviedb.org/3/movie/${movie.movieId}?&api_key=bcd69b485671c77289868b4acf21bcf0&append_to_results=imdb_id`)
  // }
  //
  // function getYouTube(movie){
  //     axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movie.title.split(" ").join("+")}+trailer&key=AIzaSyDzIKgrZXiQZjPCJT1GcTEggK09QCYESw0`)
  //     .then(function(yt){
  //       movie.youtubeLink = `http://www.youtube.com/embed/${yt.items[0].id.videoId}`
  //       return movie
  //     })
  //   }


// function bottomFive(){
//   // var list = filterMovies()
//   // debugger
//   // movies.forEach((m) => {
//   //   getMovieInfo(m)
//   // })
//   var fmovies = movies.filter(filterMovies)
//   var result = fmovies.slice(0,5)
//   return result
// }
// ----------------end helpers --------------------
