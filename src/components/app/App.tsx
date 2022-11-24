import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import ItemPage from '../../pages/item-page/item-page';
import { Container } from 'semantic-ui-react';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute } from '../../const';

function App() {
  return (
    <Router>
      <Container>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path={`${AppRoute.Item}/:id`}>
            <ItemPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
