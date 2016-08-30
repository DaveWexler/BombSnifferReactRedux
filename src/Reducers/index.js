import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
  actorSearch: ActorSearch,
  directorSearch: DirectorSearch,
  getYouTube: GetYouTube,
  // form: formReducer,
});

export default rootReducer;
