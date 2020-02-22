export const getRecipes = () => fetch('http://localhost:5000/recipes/')
    .then(response => response.json())
    .catch(() => 'Something wrong');