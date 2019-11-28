import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Enter from './pages/Enter';
import Main from './pages/Main';

export default function App() {
  
  const [userId, setUserId] = useState(1);
  const [seminarRoom, setSeminarRoom] = useState({seminarId: 1234, seminarTitle: '디프만 외부 세미나'});

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Enter} />
        <Route exact path='/:roomId' component={Main} />
      </Switch>
    </BrowserRouter>
  );
};
