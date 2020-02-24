import React from 'react';
import PropTypes from 'prop-types';

const PreviousVariations = ({ prevRecipe }) => {
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
  return (
    <section>
      <h2 className='articles__subheading'>
          Previous:
        {' '}
        {prevRecipe.length}
      </h2>

      {prevRecipe !== 0 ? (
        <ul className="articles__list list">
          {prevRecipe.map(recipe => (
            <li
              className="articles__item"
              key={recipe.id}
            >

              <h2 className="articles__heading">{recipe.name}</h2>
              <article className='articles__article'>
                value={recipe.article}
              </article>

              <pre className='articles__code'>
                <code>
                  {recipe.code}
                </code>
              </pre>
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
      ) : ('')}
    </section>
  );
};

PreviousVariations.propTypes = {
  prevRecipe: PropTypes.arrayOf(PropTypes.object),
};

PreviousVariations.defaultProps = {
  prevRecipe: [],
};
export default PreviousVariations;
