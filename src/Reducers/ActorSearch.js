const ActorSearch = (state = {movies: []}, action) => {
  switch(action.type){
    case 'ACTOR_BY_RATING':
      return Object.assign({}, state, {movies: action.payload})
    default:
      return state
  }
}

export default ActorSearch
