import { NameSpace } from "../../const";
import {
  News,
  NewsItem
} from "../../types/news";
import { State } from "../../types/state";

export const getNews = (state: State): News | null => state[NameSpace.data].news;
export const getCurrentNews = (state: State): NewsItem | null => state[NameSpace.data].currentNews;
export const getCurrentNewsLoading = (state: State): boolean => state[NameSpace.data].currentNewsLoading;
export const getNewsLoading = (state: State): boolean => state[NameSpace.data].newsLoading;
