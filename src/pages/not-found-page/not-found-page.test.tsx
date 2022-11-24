import {
  render,
  screen
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Link, MemoryRouter } from 'react-router-dom';
import { makeFakeNewsItems } from '../../mocks/fake-news';
import { Container } from 'semantic-ui-react';
import NotFoundPage from './not-found-page';

const mockStore = configureStore();

const newsItems = makeFakeNewsItems();

const store = mockStore({
  DATA: {
    newsLoading: false,
    newsItems: newsItems,
    unloadedNewsItems: [],
  },
});

describe('Not Found Page', () => {
  it('should render 404 text when render Not Found Page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <nav>
            <Link to="/">Home</Link>
          </nav>
          <Container>
            <NotFoundPage></NotFoundPage>
          </Container>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });
});