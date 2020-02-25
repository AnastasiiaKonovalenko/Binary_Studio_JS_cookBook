<<<<<<< HEAD
export const getRecipes = () => fetch('https://secure-spire-78632.herokuapp.com/recipes/')
    .then(response => response.json())
    .catch(() => 'Something wrong');
=======
const getRecipes = () => fetch('https://secure-spire-78632.herokuapp.com/recipes/')
  .then(response => response.json())
  .catch(() => 'Something wrong');

export default getRecipes;

>>>>>>> develop
