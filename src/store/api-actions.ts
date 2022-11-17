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
  setCurrentNewsLoading,
  setNewsLoading
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
      const { data } = await api.get<[number]>(`${APIRoute.News}newstories.json`);
      dispatch(loadNews(data.slice(0, MAX_NEWS))) // Limit news
      dispatch(setNewsLoading(false));
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
      dispatch(setCurrentNewsLoading(true));
      const { data } = await api.get<NewsItem>(`${APIRoute.NewsItem}/${id}.json`);
      dispatch(loadCurrentNews(data));
      dispatch(setCurrentNewsLoading(false));

      // If we go to the address "/item/id" with a non-existent id, we get a response of 200 and null from the server
      if (data === null) {
        toast.error('No data!')
      }
    } catch (error) {
      errorHandle(error);
    }
  },
);
