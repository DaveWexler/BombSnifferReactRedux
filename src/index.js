import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import rootReducer from './Reducers/index'
import './index.css';
import { createStore } from 'redux'
// import ReduxPromise from 'redux-promise'



const store = createStore(rootReducer)
console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
