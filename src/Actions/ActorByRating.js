import $ from 'jquery'
import axios from 'axios'
import MovieObj from '../models/movie'

var personID
var movies = []

function actorByRating(UserInput) {
  // searchActors().then(getMovies)
  // var request = bottomFive(movies)
  // console.log(request)
  // bottomFive(filterMovies(getMovieInfo(getYouTube(getMovies(searchActors())))))/
  searchActors()
  .then(function(response){
    const actorId = response.data.results[0].id
    return actorId
  })
  .then((personID) => {
    return getMoviesFromPersonID(personID)
  })
  .then(function(response) {
    const movieList = []
    response.data.results.forEach((m) => {
      var poster_path = "http://image.tmdb.org/t/p/w500" + m.poster_path
      var movie = new MovieObj(m.title, m.release_date.split("-")[0], m.id, m.overview, poster_path)
      movieList.push(movie)
      // saveMovie(movie)
    })
    return Promise.all(movieList)
  }).then((movieList) => {
    debugger
  })

  function searchActors() {
    return axios.get(`https://api.themoviedb.org/3/search/person?query=${UserInput}&api_key=bcd69b485671c77289868b4acf21bcf0`)
  }

  function getMoviesFromPersonID(id) {
    return axios.get(`https://api.themoviedb.org/3/discover/movie?with_cast=${id}&vote_count.gte=20&sort_by=vote_average.asc&budget.desc&api_key=bcd69b485671c77289868b4acf21bcf0&include_image_language=en`)
    // return movies
  }

  function saveMovie(movie){
    movies.push(movie)
  }
//-----------helpers to get all required attrs for movie below------------
  function getMovieInfo(movie){
    return axios.get(`https://api.themoviedb.org/3/movie/${movie.movieId}?&api_key=bcd69b485671c77289868b4acf21bcf0&append_to_results=imdb_id`)
  }

  function getYouTube(movie){
      axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movie.title.split(" ").join("+")}+trailer&key=AIzaSyDzIKgrZXiQZjPCJT1GcTEggK09QCYESw0`)
      .then(function(yt){
        movie.youtubeLink = `http://www.youtube.com/embed/${yt.items[0].id.videoId}`
        return movie
      })
    }

  function filterMovies(m) {
    return (m.poster.split("/").pop() !== "w500null" && parseInt(m.year) < 2016 && m.revenue !== 0)
  }

function bottomFive(){
  // var list = filterMovies()
  // debugger
  // movies.forEach((m) => {
  //   getMovieInfo(m)
  // })
  var fmovies = movies.filter(filterMovies)
  var result = fmovies.slice(0,5)
  return result
}
// ----------------end helpers --------------------
  return {
    type: "ACTOR_BY_RATING",
    payload: request
  }
}

export default actorByRating

// new Promise(function(fulfill, reject){
//     //do something for 5 seconds
//     fulfill(result);
// }).then(function(result){
//     return new Promise(function(fulfill, reject){
//         //do something for 5 seconds
//         fulfill(result);
//     });
// }).then(function(result){
//     return new Promise(function(fulfill, reject){
//         //do something for 8 seconds
//         fulfill(result);
//     });
// }).then(function(result){
//     //do something with the result
// });
// var request = new Promise(function(resolve, reject){
//   var personId
//   return $.ajax({
//     method: "GET",
//     url: `https://api.themoviedb.org/3/search/person?query=${UserInput}&api_key=bcd69b485671c77289868b4acf21bcf0`
//   }).done(function(response){
//     debugger
//     return personId = response.results[0].id
//   })
//   debugger
//   resolve(personId)
// }).then(function(result){
//   debugger
//   var tempmovies = []
//   $.ajax({
//     method: "GET",
//     url: `https://api.themoviedb.org/3/discover/movie?with_cast=${result}&vote_count.gte=20&sort_by=vote_average.asc&budget.desc&api_key=bcd69b485671c77289868b4acf21bcf0&include_image_language=en`
//   }).done(function(response) {
//     response.results.forEach((m) => {
//       var movie = {}
//       movie.title = m.title
//       movie.year = m.release_date.split("-")[0]
//       movie.movieId = m.id
//       movie.overview = m.overview
//       movie.poster = "http://image.tmdb.org/t/p/w500" + m.poster_path
//       debugger
//       tempmovies.push(movie)
//     })
//   })
//   resolve(tempmovies)
// }).then(function(result){
//   var youtubeArray = []
//   result.forEach((movie) => {
//     $.ajax({
//     method: "GET",
//     url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movie.title.split(" ").join("+")}+trailer&key=AIzaSyDzIKgrZXiQZjPCJT1GcTEggK09QCYESw0`
//     }).done(function(yt){
//       movie.youtubeLink = `http://www.youtube.com/embed/${yt.items[0].id.videoId}`
//       youtubeArray.push(movie)
//     })
//   })
//   resolve(youtubeArray)
// }).then(function(result){
//   var infoArray = []
//   result.forEach((m) => {
//     $.ajax({
//       method: "GET",
//       url: `https://api.themoviedb.org/3/movie/${m.movieId}?&api_key=bcd69b485671c77289868b4acf21bcf0&append_to_results=imdb_id`
//     }).done(function(response) {
//       m.revenue = response.revenue
//       m.budget = response.budget
//       m.imdbId = response.imdb_id
//       infoArray.push(m)
//     })
//   })
//   resolve(infoArray)
// }).then(function(result){
//   fulfill(result.filter((m) => {
//     return m.poster.split("/").pop() !== "w500null" && parseInt(m.year) < 2016 && m.revenue
//   }));
// }).then(function(result){
//   var fivemovies = []
//   for (i = 0; i < 5; i++){
//     fivemovies.push(result[i])
//   }
//   debugger
//   return fivemovies
// })
