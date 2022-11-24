import {
  render,
  screen
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeNewsItems } from '../../mocks/fake-news';
import { Container } from 'semantic-ui-react';
import NewsListItem from './news-list-item';
import { convertUnixTimeToDate } from '../../utils';

const mockStore = configureStore();

const newsItems = makeFakeNewsItems();

const store = mockStore({
  DATA: {
    unloadedNewsItems: [],
  },
});

describe('News list item', () => {
  it('should render all information about news', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Container>
            <NewsListItem newsItem={newsItems[0]}></NewsListItem>
          </Container>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(newsItems[0].title)).toBeInTheDocument();
    expect(screen.getByText(`Author: ${newsItems[0].by}`)).toBeInTheDocument();
    expect(screen.getByText(`Score: ${newsItems[0].score}`)).toBeInTheDocument();
    expect(screen.getByText(convertUnixTimeToDate(newsItems[0].time))).toBeInTheDocument();
  });
});