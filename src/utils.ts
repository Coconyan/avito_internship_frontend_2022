import { APIRoute } from "./const";
import { errorHandle } from "./services/error-handle";
import { api } from "./store";
import { NewsItem } from "./types/news";

export const convertUnixTimeToDate = (unixTime: number) => {
  const time = new Date(unixTime * 1000);
  return time.toLocaleString();
}
// todo any???
export const fetchCurrentNewsItem = async (id: number, setItem?: React.Dispatch<React.SetStateAction<any>>) => {
  try {
    const { data } = await api.get<NewsItem>(`${APIRoute.NewsItem}/${id}.json`);
    setItem && setItem(data);
  } catch (error) {
    errorHandle(error);
  }
};