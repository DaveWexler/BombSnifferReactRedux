export default const actorByRating = () => {

  var personId


  function searchActors(input) {

    return $.ajax({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/person?query=${input}&api_key=bcd69b485671c77289868b4acf21bcf0`
    }).done(function(response){
      personId = response.results[0].id
    })
  }

  function getMovies() {
    var movies = []
    return $.ajax({
    //search for movies of that person
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?with_cast=${personId}&vote_count.gte=20&sort_by=vote_average.asc&budget.desc&api_key=bcd69b485671c77289868b4acf21bcf0&include_image_language=en`
    }).done(function(response) {
    // debugger
    //make all movie object for that actor
      response.results.forEach((m) => {
        movie = {}
        movie.title = m.title
        movie.year = m.release_date.split("-")[0]
        movie.movieId = m.id
        movie.overview = m.overview
        movie.poster = "http://image.tmdb.org/t/p/w500" + m.poster_path
        getYoutube(movie)
        getMovieInfo(movie)
        debugger
        movies.push(movie)
      })
    })
  }
//-----------helpers to get all required attrs for movie below------------
  function getMovieInfo(m){
    //assign movies more information
    $.ajax({
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${m.movieId}?&api_key=bcd69b485671c77289868b4acf21bcf0&append_to_results=imdb_id`
    }).done(function(response) {
      m.revenue = response.revenue
      m.budget = response.budget
      m.imdbId = response.imdb_id
    })
  }


  function getYoutube(movie){
      $.ajax({
      method: "GET",
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movie.title.split(" ").join("+")}+trailer&key=AIzaSyDzIKgrZXiQZjPCJT1GcTEggK09QCYESw0`
      }).done(function(yt){
        movie.youtubeLink = `http://www.youtube.com/embed/${yt.items[0].id.videoId}`
      })
    // })
  }
// ----------------end helpers --------------------
  return {
    type: "ACTOR_BY_RATING"
    payload:
  }
}
