import { combineReducers } from 'redux';
import ActorSearch from './ActorSearch'
import { reducer as formReducer } from 'redux-form';



const rootReducer = combineReducers({
  actorSearch: ActorSearch,
  form: formReducer
  // directorSearch: DirectorSearch,
  // getYouTube: GetYouTube,
});

export default rootReducer;
