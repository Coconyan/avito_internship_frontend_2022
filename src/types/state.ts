import { store } from '../store/index.js';
import {
  News,
  NewsItem
} from './news.js';

export type Data = {
  news: News | null;
  currentNews: NewsItem | null;
  currentNewsLoading: boolean;
  newsLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
