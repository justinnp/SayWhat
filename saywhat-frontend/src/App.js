import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import CreationModal from './Components/CreationModal';
import Hub from './Components/Hub';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/creation" component={CreationModal} />
          <Route path="/home" component={Hub} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
