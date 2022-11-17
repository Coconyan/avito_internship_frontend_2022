import { store } from '../store/index.js';

export type Data = {
  news: any | null;
  currentNews: any | null;
  currentNewsLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;