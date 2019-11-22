import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Enter from './pages/Enter';
import Main from './pages/Main';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Enter} />
        <Route exact path='/:roomId' component={Main} />
      </Switch>
    </BrowserRouter>
  );
};
