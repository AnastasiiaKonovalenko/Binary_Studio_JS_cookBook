import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
  INPUT_QUERY, LOAD_SUCCESS,
  LOADING,
} from '../store/actions';

const initialState = {
  recipes: [],
  isLoading: true,
  queryRecipe: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SUCCESS:
      return {
        ...state,
        recipes: action.recipes,
      };

    case LOADING:
      return {
        ...state,
        isLoading: action.spin,
      };

    case INPUT_QUERY:
      return {
        ...state,
        queryRecipe: action.query,
      };

    default:
      return state;
  }
};

export const store = createStore(rootReducer, applyMiddleware(thunk));
