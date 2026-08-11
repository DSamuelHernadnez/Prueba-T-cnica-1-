import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { recipeReducer } from '../features/recipes/recipeReducer';

const rootReducer = combineReducers({
  recipes: recipeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));