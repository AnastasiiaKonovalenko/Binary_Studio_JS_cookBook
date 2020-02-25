import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => (
  <div className='no_match'>
    <h1>404</h1>
    <h2>Page not found</h2>
    <Link to='/'>Home</Link>
    <div className='picture'/>

  </div>
);

export default NoMatch;
