import React, { Component } from 'react';
import { Router, Route, browserHistory ,IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Add from './components/Add';
const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path="/Add" component={Add}/>
    </Route>
  </Router>
);

export default renderRoutes;
