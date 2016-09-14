import $ from 'jquery'

var personId,
    movies = [],
    initialMovies = {},
    firstMovieInfo = [],
    secondMovieInfo = [],
    finalMovieInfo = []


function actorByRating(UserInput) {
  
  searchActors().then(getMovies)
  initialMovies.results.forEach((m) => {
    var movie = {}
    movie.title = m.title
    movie.year = m.release_date.split("-")[0]
    movie.movieId = m.id
    movie.overview = m.overview
    movie.poster = "http://image.tmdb.org/t/p/w500" + m.poster_path
    // getYouTube(movie)
    // getMovieInfo(movie)
    saveMovieFirst(movie)
  })
  firstMovieInfo.forEach((m) => {
    getMovieInfo(m)
  })
  secondMovieInfo.forEach((m) =>{
    getYouTube(m)
  })


  var request = bottomFive(movies)
  console.log(request)
  // bottomFive(filterMovies(getMovieInfo(getYouTube(getMovies(searchActors())))))

  function searchActors() {
    return $.ajax({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/person?query=${UserInput}&api_key=bcd69b485671c77289868b4acf21bcf0`
    }).done(function(response){
      personId = response.results[0].id
    })
  }

  function getMovies() {
    $.ajax({
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?with_cast=${personId}&vote_count.gte=20&sort_by=vote_average.asc&budget.desc&api_key=bcd69b485671c77289868b4acf21bcf0&include_image_language=en`
    }).done(function(response) {
      initialMovies = response
      // response.results.forEach((m) => {
      //   var movie = {}
      //   movie.title = m.title
      //   movie.year = m.release_date.split("-")[0]
      //   movie.movieId = m.id
      //   movie.overview = m.overview
      //   movie.poster = "http://image.tmdb.org/t/p/w500" + m.poster_path
      //
      //   getYouTube(movie)
      //   getMovieInfo(movie)
      //   saveMovie(movie)
      // })
    })
    // return movies
  }
  function saveMovieFirst(movie){
    firstMovieInfo.push(movie)
  }
  function saveMovieSecond(movie){
    secondMovieInfo.push(movie)
  }
  function saveMovieFinal(movie){
    finalMovieInfo.push(movie)
  }
//-----------helpers to get all required attrs for movie below------------
  function getMovieInfo(m){
      $.ajax({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${m.movieId}?&api_key=bcd69b485671c77289868b4acf21bcf0&append_to_results=imdb_id`
      }).done(function(response) {
        m.revenue = response.revenue
        m.budget = response.budget
        m.imdbId = response.imdb_id
        saveMovieSecond(m)
      })
  }

  function getYouTube(movie){
      $.ajax({
      method: "GET",
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movie.title.split(" ").join("+")}+trailer&key=AIzaSyDzIKgrZXiQZjPCJT1GcTEggK09QCYESw0`
      }).done(function(yt){
        movie.youtubeLink = `http://www.youtube.com/embed/${yt.items[0].id.videoId}`
        saveMovieFinal(movie)
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
  debugger
  var fmovies = finalMovieInfo.filter(filterMovies)
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
