import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import {
  APIRoute,
  MAX_NEWS
} from '../const';
import { errorHandle } from '../services/error-handle';
import { NewsItem } from '../types/news';
import {
  AppDispatch,
  State
} from '../types/state';
import {
  loadCurrentNews,
  loadNews,
  loadNewsItems,
  setNewsLoading,
  setUnloadedNewsItems
} from './data/data';

export const fetchNewsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNews',
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(setNewsLoading(true));
      const { data } = await api.get<number[]>(`${APIRoute.News}newstories.json`);
      dispatch(loadNews(data.slice(0, MAX_NEWS))); // Limit news MAX_NEWS

      dispatch(fetchNewsItemsAction(data.slice(0, MAX_NEWS)));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchNewsItemsAction = createAsyncThunk<void, number[], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNewsItems',
  async (news: number[], { dispatch, getState, extra: api }) => {
    try {
      const newsItems = getState().DATA.newsItems;
      let unloadedNewsItems: number[] = [];
      if (newsItems !== null) {
        unloadedNewsItems = news.filter((item) => {
          for (const news of newsItems) {
            if (item === news.id) {
              return false
            }
          } return true
        });
      } else {
        unloadedNewsItems = news;
      }
      if (unloadedNewsItems !== null) {
        dispatch(setUnloadedNewsItems(unloadedNewsItems));
      }

      const data = await Promise.all(unloadedNewsItems.map((item) => 
        api.get<NewsItem>(`${APIRoute.Item}/${item}.json`)
      ));

      // if data is null
      if (data.length !== 0 && data[0].data === null) {
        dispatch(setUnloadedNewsItems([]));
        dispatch(setNewsLoading(false));
      } else {
        let newData = data.map((item) => item.data);
        dispatch(loadNewsItems(newData));
        dispatch(setUnloadedNewsItems([]));
        dispatch(setNewsLoading(false));
      }
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCurrentNews = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentNews',
  async (id: number, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<NewsItem>(`${APIRoute.Item}/${id}.json`);
      dispatch(loadCurrentNews(data));

      // If we go to the address "/item/id" with a non-existent id, we get a response of 200 and null from the server
      if (data === null) {
        toast.error('No data!')
      }
    } catch (error) {
      errorHandle(error);
    }
  },
);
