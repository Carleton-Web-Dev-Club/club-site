import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

import './main.css';

const App = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </>
);

export default App;
