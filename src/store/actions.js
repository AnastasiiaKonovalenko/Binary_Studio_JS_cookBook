import getRecipes from '../api/recipesApi';

export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOADING = 'LOADING';
export const INPUT_QUERY = 'INPUT_QUERY';

const loadRecipesSeccess = recipes => ({
  type: LOAD_SUCCESS, recipes,
});

export const loadRecipes = () => (dispatch) => {
  getRecipes()
    .then(({ data }) => dispatch(loadRecipesSeccess(data)));
};

export const setIsLoading = spin => ({
  type: LOADING, spin,
});

export const setQueryRecipe = query => ({
  type: INPUT_QUERY, query,
});

