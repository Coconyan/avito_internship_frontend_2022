import { store } from '../store/index.js';
import {
  News,
  NewsItem
} from './news.js';

export type Data = {
  news: News | null;
  newsItems: NewsItem[] | null;
  unloadedNewsItems: NewsItem[];
  currentNews: NewsItem | null;
  newsLoading: boolean;
};

export type Comments = {
  commentsList: number[];
  commentsLoading: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
