import {
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPE_DETAIL_SUCCESS,
  ADD_RECIPE_SUCCESS,
  DELETE_RECIPE_SUCCESS,
  SET_LOADING,
  SET_ERROR,
} from './recipeActions';

const initialState = {
  list: [],
  selectedRecipe: null,
  loading: false,
  error: null,
};

export const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case FETCH_RECIPES_SUCCESS:
      return { ...state, list: action.payload, error: null };
    case FETCH_RECIPE_DETAIL_SUCCESS:
      return { ...state, selectedRecipe: action.payload, error: null };
    case ADD_RECIPE_SUCCESS:
      return { ...state, list: [action.payload, ...state.list] };
    case DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((recipe) => recipe.id !== action.payload),
      };
    default:
      return state;
  }
};