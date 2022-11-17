import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
import { errorHandle } from '../services/error-handle';
import { NewsItem } from '../types/news';
import {
  AppDispatch,
  State
} from '../types/state';
import { redirectToRoute } from './actions';
import { loadCurrentNews, loadNews, setCurrentNewsLoading } from './data/data';
// import { redirectToRoute } from './actions';
// import { loadOffers } from './data/data';

export const fetchNewsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNews',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<[number]>(`${APIRoute.News}newstories.json`);
      dispatch(loadNews(data.slice(0, 100))) // Limit 100 news
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
      // console.log(data);
      // const {data: dataNearby} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
      // dispatch(loadCurrentOffersNearby(dataNearby));
      // const {data: dataComments} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
      // dispatch(loadCurrentOfferComments(dataComments));
      dispatch(setCurrentNewsLoading(false));
    } catch (error) {
      errorHandle(error);
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

// const fetchCurrentNewsItem = async (id: number) => {
//     try {
//       // dispatch(setCurrentNewsLoading(true));
//       const { data } = await api.get<NewsItem>(`${APIRoute.NewsItem}/${id}.json`);
//       console.log(data);
//       // const {data: dataNearby} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
//       // dispatch(loadCurrentOffersNearby(dataNearby));
//       // const {data: dataComments} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
//       // dispatch(loadCurrentOfferComments(dataComments));
//       // dispatch(setCurrentNewsLoading(false));
//     } catch (error) {
//       errorHandle(error);
//       // dispatch(redirectToRoute(AppRoute.NotFound));
//     }
//   },
// };


// export const fetchCurrentNewsItem = createAsyncThunk<void, number, {
//   dispatch: AppDispatch,
//   state: State,
//   extra: AxiosInstance
// }>(
//   'data/fetchCurrentNewsItem',
//   async (id: number, {dispatch, extra: api}) => {
//     try {
//       // dispatch(setCurrentNewsLoading(true));
//       const {data} = await api.get<any>(`${APIRoute.NewsItem}/${id}.json`);
//       return data;
//       // const {data: dataNearby} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
//       // dispatch(loadCurrentOffersNearby(dataNearby));
//       // const {data: dataComments} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
//       // dispatch(loadCurrentOfferComments(dataComments));
//       // dispatch(setCurrentNewsLoading(false));
//     } catch (error) {
//       errorHandle(error);
//       dispatch(redirectToRoute(AppRoute.NotFound));
//     }
//   },
// );

