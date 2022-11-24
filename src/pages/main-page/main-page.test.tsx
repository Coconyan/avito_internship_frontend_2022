import {
  render,
  screen
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeNewsItems } from '../../mocks/fake-news';
import { Container } from 'semantic-ui-react';
import MainPage from './main-page';

const mockStore = configureStore();

const newsItems = makeFakeNewsItems();

const store = mockStore({
  DATA: {
    newsLoading: false,
    newsItems: newsItems,
    unloadedNewsItems: [],
  },
});

describe('Main Page', () => {
  it('should render Hacker news header when render Main Page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Container>
            <MainPage></MainPage>
          </Container>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/HACKER NEWS/i)).toBeInTheDocument();
  });
});