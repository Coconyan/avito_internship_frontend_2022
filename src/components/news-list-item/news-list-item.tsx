import { useEffect, useState } from "react";
import { APIRoute } from "../../const";
import { errorHandle } from "../../services/error-handle";
import { api } from "../../store";
import { NewsItem } from "../../types/news";
import { convertUnixTimeToDate } from "../../utils";

type PropsType = {
  newsItem: string;
};

function NewsListItem({ newsItem }: PropsType): JSX.Element {
  const [item, setItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    fetchCurrentNewsItem(Number(newsItem));
  }, []);

  const fetchCurrentNewsItem = async (id: number) => {
    try {
      const { data } = await api.get<NewsItem>(`${APIRoute.NewsItem}/${id}.json`);
      // console.log('fetch item');
      setItem(data);
    } catch (error) {
      errorHandle(error);
    }
  };

  if (!item) {
    return (<h2>Loading...</h2>)
  }

  const { by, title, time, score } = item;

  return (
    <>
      <span>{newsItem}</span>
      <h2>Title: {title}</h2>

      <p>Author: {by}</p>
      <p>Rating: {score}</p>
      <p>Time: {convertUnixTimeToDate(time)}</p>
      
    </>
  );
};

export default NewsListItem;
