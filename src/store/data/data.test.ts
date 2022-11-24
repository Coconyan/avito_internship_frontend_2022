import {
  makeFakeNewsItem,
  makeFakeNewsItems,
  makeFakeNewsList
} from '../../mocks/fake-news';
import {
  data,
  loadCurrentNews,
  loadNews,
  loadNewsItems,
  setUnloadedNewsItems,
  setNewsLoading
} from './data';

const newsItems = makeFakeNewsItems();
const newsList = makeFakeNewsList();
const newsItem = makeFakeNewsItem();
const state = {
  news: null,
  newsItems: null,
  currentNews: null,
  newsLoading: false,
  unloadedNewsItems: [],
};

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(data.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        news: null,
        newsItems: null,
        currentNews: null,
        newsLoading: false,
        unloadedNewsItems: [],
      });
  });

  it('should update news by load news', () => {
    expect(data.reducer(state, loadNews(newsList)))
      .toEqual({
        news: newsList,
        newsItems: null,
        currentNews: null,
        newsLoading: false,
        unloadedNewsItems: [],
      });
  });

  it('should update current news by load current news', () => {
    expect(data.reducer(state, loadCurrentNews(newsItem)))
      .toEqual({
        news: null,
        newsItems: null,
        currentNews: newsItem,
        newsLoading: false,
        unloadedNewsItems: [],
      });
  });

  it('should update news items by load news items', () => {
    expect(data.reducer(state, loadNewsItems(newsItems)))
      .toEqual({
        news: null,
        newsItems: newsItems,
        currentNews: null,
        newsLoading: false,
        unloadedNewsItems: [],
      });
  });

  it('should update unloaded items by set unloaded items', () => {
    expect(data.reducer(state, setUnloadedNewsItems(newsList)))
      .toEqual({
        news: null,
        newsItems: null,
        currentNews: null,
        newsLoading: false,
        unloadedNewsItems: newsList,
      });
  });

  it('should update loaded status items by set news loading', () => {
    expect(data.reducer(state, setNewsLoading(true)))
      .toEqual({
        news: null,
        newsItems: null,
        currentNews: null,
        newsLoading: true,
        unloadedNewsItems: [],
      });
  });
});