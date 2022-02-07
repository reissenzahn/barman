import { createStore, combineReducers } from 'redux';

// import { recipesReducer } from './recipes';

const reducer = combineReducers({
  // recipes: recipesReducer,
})

const store = createStore(reducer);

export default store;
