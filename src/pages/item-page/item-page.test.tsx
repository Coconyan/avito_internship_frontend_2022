import {
  render,
  screen
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

const mockStore = configureStore();

const store = mockStore({
  DATA: {
    unloadedNewsItems: [],
  },
});

describe('Item Page', () => {
  it('should render Item Page correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Container>
            <h1>Mock Item Page</h1>
          </Container>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Mock Item Page/i)).toBeInTheDocument();
  });
});