import {
  render,
  screen
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {
  Link,
  MemoryRouter,
} from 'react-router-dom';
import { makeFakeNewsItems } from '../../mocks/fake-news';
import { Container } from 'semantic-ui-react';
import NewsList from './news-list';
import { AppRoute } from '../../const';

const mockStore = configureStore();

const newsItems = makeFakeNewsItems();

const store = mockStore({
  DATA: {
    unloadedNewsItems: [],
  },
});

describe('News list', () => {
  it('should render "Home" link when render component NewsList', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Container>
            <nav>
              <Link to="/">Home</Link>
            </nav>
            <NewsList newsItems={newsItems}></NewsList>
          </Container>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it('should render link with correct href to newsItem', () => {
    render(
    <Provider store={store}>
      <MemoryRouter>
        <Container>
          <nav>
            <Link to="/">Home</Link>
          </nav>
          <NewsList newsItems={[newsItems[0]]}></NewsList>
        </Container>
      </MemoryRouter>
    </Provider>);

    expect(screen.getByTestId('item-link')).toHaveAttribute('href', `${AppRoute.Item}/${newsItems[0].id}`);
  });
});