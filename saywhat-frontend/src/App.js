import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import CreationModal from './Components/CreationModal';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/creation" component={CreationModal} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
