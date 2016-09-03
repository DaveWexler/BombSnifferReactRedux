import $ from 'jquery'

function actorByRating(UserInput) {

  var request = bottomFive(filterMovies(getMovieInfo(getYouTube(getMovies(searchActors())))))

  function searchActors() {
    var personId
    return $.ajax({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/person?query=${UserInput}&api_key=bcd69b485671c77289868b4acf21bcf0`
    }).done(function(response){
      debugger
      return personId = response.results[0].id
    })
  }

  function getMovies(actorID) {
    var tempmovies = []
    $.ajax({
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?with_cast=${actorID}&vote_count.gte=20&sort_by=vote_average.asc&budget.desc&api_key=bcd69b485671c77289868b4acf21bcf0&include_image_language=en`
    }).done(function(response) {
      response.results.forEach((m) => {
        var movie = {}
        movie.title = m.title
        movie.year = m.release_date.split("-")[0]
        movie.movieId = m.id
        movie.overview = m.overview
        movie.poster = "http://image.tmdb.org/t/p/w500" + m.poster_path
        tempmovies.push(movie)
      })
    })
    return tempmovies
  }
//-----------helpers to get all required attrs for movie below------------
  function getMovieInfo(movieArray){
    //assign movies more information
    var infoArray = []
    movieArray.forEach((m) => {
      $.ajax({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${m.movieId}?&api_key=bcd69b485671c77289868b4acf21bcf0&append_to_results=imdb_id`
      }).done(function(response) {
        m.revenue = response.revenue
        m.budget = response.budget
        m.imdbId = response.imdb_id
        infoArray.push(m)
      })
    })
    return infoArray
  }

  function getYouTube(movieArray){
    var youtubeArray = []
    movieArray.forEach((movie) => {
      $.ajax({
      method: "GET",
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movie.title.split(" ").join("+")}+trailer&key=AIzaSyDzIKgrZXiQZjPCJT1GcTEggK09QCYESw0`
      }).done(function(yt){
        movie.youtubeLink = `http://www.youtube.com/embed/${yt.items[0].id.videoId}`
        youtubeArray.push(movie)
      })
    })
    return youtubeArray
  }

  function filterMovies(moviesArray) {
  //filter movies so that we only have ones with rev, budget, imbd and poster
    return moviesArray.filter((m) => {
      return m.poster.split("/").pop() !== "w500null" && parseInt(m.year) < 2016 && m.revenue
    });
  }

function bottomFive(filteredArray){
  debugger
  var result = []
  for (i = 0; i < 5; i++){
    result.push(filteredArray[i])
  }
  debugger
  return result
}
// ----------------end helpers --------------------
  return {
    type: "ACTOR_BY_RATING",
    payload: request
  }
}

export default actorByRating
