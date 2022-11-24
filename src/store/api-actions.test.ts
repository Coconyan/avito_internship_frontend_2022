import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import {
  fetchCurrentNews,
  fetchNewsAction
} from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import {
  loadCurrentNews,
  loadNews
} from './data/data';
import {
  makeFakeNewsItem,
  makeFakeNewsList
} from '../mocks/fake-news';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load News when GET /newstories', async () => {
    const mockNewsList = makeFakeNewsList();
    mockAPI
      .onGet(`${APIRoute.News}newstories.json`)
      .reply(200, mockNewsList);

    const store = mockStore();

    await store.dispatch(fetchNewsAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(loadNews.toString());
  });

  it('should dispatch Load News Item when GET /item/id', async () => {
    const mockNewsItem = makeFakeNewsItem();
    mockAPI
      .onGet(`${APIRoute.Item}/1.json`)
      .reply(200, mockNewsItem);

    const store = mockStore();

    await store.dispatch(fetchCurrentNews(1));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(loadCurrentNews.toString());
  });
});