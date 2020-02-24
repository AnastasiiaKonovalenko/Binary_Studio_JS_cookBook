import React from 'react';
import RecipesList from '../recipesList/recipesList';
import Header from '../header/header';
import Footer from '../footer/footer';

const Home = () => (
  <>
    <header className="header">
      <Header />
    </header>

    <main className="main">
      <section className="main__container">
        <RecipesList />
      </section>
    </main>

    <footer className="footer">
      <section className="footer__container">
        <Footer />
      </section>
    </footer>
  </>
);

export default Home;
