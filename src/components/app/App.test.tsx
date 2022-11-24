import {
  render,
  screen
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AppRoute } from '../../const';
import {
  Switch,
  Route,
  Link,
  MemoryRouter
} from 'react-router-dom';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {
  makeFakeNewsItems,
  makeFakeNewsList
} from '../../mocks/fake-news';
import { Container } from 'semantic-ui-react';

const mockStore = configureStore();

const store = mockStore({
  COMMENTS: {
    commentsList: [],
    commentsLoading: false,
  },
  DATA: {
    news: makeFakeNewsList(),
    newsItems: makeFakeNewsItems(),
    currentNews: null,
    newsLoading: false,
    unloadedNewsItems: [],
  },
});

const fakeApp = (entries = '/') => (
  <Provider store={store}>
    <MemoryRouter initialEntries={[entries]}>
      <Container>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Switch>
          <Route exact path="/">
            <h1>Mock Main Page</h1>
          </Route>
          <Route path="/item/:id">
            <h1>Mock Item Page</h1>
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Container>
    </MemoryRouter >
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    render(fakeApp());

    expect(screen.getByText(/Mock Main Page/i)).toBeInTheDocument();
  });


  it('should render "ItemPage" when user navigate to "/item/id"', () => {
    render(fakeApp(`${AppRoute.Item}/1`));

    expect(screen.getByText(/Mock Item Page/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    render(fakeApp('/non-existent-route'));

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});