import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/home';
import NoMatch from './components/noMatch/noMatch';
import Recipe from './components/recipe/recipe';
import Soon from './components/comingSoon/commingSoon';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route path="/recipe/:id">
        <Recipe />
      </Route>

      <Route path="/categories/string" component={Soon} />
      <Route path="/categories/number" component={Soon} />
      <Route path="/categories/array" component={Soon} />
      <Route path="/categories/object" component={Soon} />
      <Route path="/categories/function" component={Soon} />
      <Route path="/categories/regexp" component={Soon} />
      <Route path="/categories/patterns" component={Soon} />
      <Route path="/categories/dom" component={Soon} />
      <Route path="/write_for_cookbook" component={Soon} />
      <Route path="/ebooks" component={Soon} />
      <Route path="sign_in" component={Soon} />
      <Route component={NoMatch} />
    </Switch>
  );
}

export default App;
