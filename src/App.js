import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import './css/style.css';
import Main from './pages/Main';
import List from './pages/List';
import ParkCar from './pages/ParkCar';
import store from './store';
import history from './history';

const App = () => {
  return (
      <Provider store={store}>
        <Router history={history}>
          <header>
            <h3 className="title pt-2">Automatic Parking Lot System</h3>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/list">
              <List />
            </Route>
            <Route path="/park-car">
              <ParkCar />
            </Route>
            <Redirect to="/" />
          </Switch>
          </header>
        </Router>
      </Provider>
  );
};

export default App;
