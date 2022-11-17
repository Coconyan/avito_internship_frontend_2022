import React from 'react';
// import logo from './img/logo.svg';
// import styles from './App.module.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import ItemPage from '../../pages/item-page/item-page';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/items/:id">
            <ItemPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
