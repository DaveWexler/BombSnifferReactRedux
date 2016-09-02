import { combineReducers } from 'redux';
import ActorSearch from './ActorSearch'
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
  actorSearch: ActorSearch,
  // directorSearch: DirectorSearch,
  // getYouTube: GetYouTube,
  form: formReducer,
});

export default rootReducer;
