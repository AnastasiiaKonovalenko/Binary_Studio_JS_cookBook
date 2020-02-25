import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { loadRecipes, setIsLoading } from '../../store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

}));

const RecipesList = ({ loadData, recipes, queryRecipe }) => {
  const classes = useStyles();

  useEffect(() => {
    loadData();
  }, []);

  const location = useLocation();
  const history = useHistory();

  const months = [
    'Jen',
    'Feb',
    'March',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  let filteredRecipes = '';

  if (queryRecipe === '') {
    filteredRecipes = recipes;
  } else {
    filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase()
      .includes(queryRecipe.trim().toLowerCase()));
  }

  const searchParams = new URLSearchParams(location.search);

  let sortedRecipes = '';

  const sortParam = searchParams.get('sort');

  if (sortParam) {
    if (sortParam === 'published') {
      sortedRecipes = [...filteredRecipes]
        .sort((a, b) => {
          const aDate = new Date(+a[sortParam]
            .split('/').slice(2), +a[sortParam]
            .split('/').slice(0, 1) - 1, +a[sortParam]
            .split('/').slice(1, 2));

          const bDate = new Date(+b[sortParam]
            .split('/').slice(2), +b[sortParam]
            .split('/').slice(0, 1) - 1, +b[sortParam]
            .split('/').slice(1, 2));

          return ((aDate - bDate) * (searchParams.get('orderOfSorting') === 'asc' ? 1 : -1));
        });
    } else {
      sortedRecipes = [...filteredRecipes]
        .sort((a, b) => (a[sortParam].localeCompare(b[sortParam]))
           * (searchParams.get('orderOfSorting') === 'asc' ? 1 : -1));
    }
  } else {
    sortedRecipes = filteredRecipes;
  }

  const sortRecipes = (param) => {
    searchParams.set('sort', param);

    if (searchParams.get('sort') === param
      && searchParams.get('orderOfSorting') === 'asc') {
      searchParams.set('orderOfSorting', 'desc');
    } else {
      searchParams.set('orderOfSorting', 'asc');
    }

    history.push({ search: searchParams.toString() });
  };

  return (
    <>
      {recipes.length === 0 ? (
        <div className="spinner">
          <CircularProgress />
        </div>
      ) : (
        <section className="main__articles articles">

          <div className={classes.root}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => sortRecipes('published')}
            >
              Sort by Date
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => sortRecipes('name')}
            >
              Sort by title
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => sortRecipes('tags')}
            >
              Sort by tag
            </Button>
          </div>

          <ul className="articles__list list">
            {sortedRecipes.map(recipe => (
              <li
                className="articles__item"
                key={recipe.id}
              >
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="articles__link link">
                  <h2 className="articles__heading">{recipe.name}</h2>
                </Link>
                <span className="articles__date">
                  <span>Published:</span>
                  {' '}
                  {
                    recipe.published.split('/')
                      .map((item, i) => (i === 0
                        ? (months.find((month, index) => (index === +item && month)))
                        : item)).map((item, i) => (i === 1 ? (`${item}, `) : item)).join(' ')
                  }
                </span>
                <span className="articles__tag">
                  <span>Tag:</span>
                  {' '}
                  {recipe.tags}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

const mapState2Props = state => ({
  recipes: state.recipes,
  isLoading: state.isLoading,
  queryRecipe: state.queryRecipe,
});

const mapDispatch2Props = ({
  loadData: loadRecipes,
  indicateLoading: setIsLoading,
});

RecipesList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  loadData: PropTypes.func.isRequired,
  queryRecipe: PropTypes.string,
};

RecipesList.defaultProps = {
  recipes: [],
  queryRecipe: '',
};


export default connect(mapState2Props, mapDispatch2Props)(RecipesList);
