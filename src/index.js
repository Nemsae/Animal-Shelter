import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/Layout';
import Home from './components/Home';
import AnimalsPage from './components/AnimalsPage';
import AdoptedAnimals from './components/AdoptedAnimals';
import TheSaints from './components/TheSaints';

render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Home} />
      <Route path='animals' component={AnimalsPage} />
      <Route path='adopted' component={AdoptedAnimals} />
      <Route path='clients' component={TheSaints} />
      {/* <Route path='watchList' component={WatchList} /> */}
    </Route>
  </Router>,
  document.getElementById('root')
);
