// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../hooks';
// import { fetchCurrentNews } from '../../store/api-actions';
// import { getCurrentNews, getCurrentNewsLoading } from '../../store/data/selectors';

import { useState, useEffect } from "react";
import { APIRoute } from "../../const";
import { errorHandle } from "../../services/error-handle";
import { api } from "../../store";
import { convertUnixTimeToDate } from "../../utils";
import Comments from "../comments/comments";

type PropsType = {
  comment: number;
};

function Comment({ comment }: PropsType): JSX.Element {
  const [item, setItem] = useState<any | null>(null);
  const [openKids, setOpenKids] = useState(false);

  useEffect(() => {
    fetchCurrentNewsItem(Number(comment));
  }, []);

  const fetchCurrentNewsItem = async (id: number) => {
    try {
      const { data } = await api.get<any>(`${APIRoute.NewsItem}/${id}.json`);
      setItem(data);
      console.log(data);
    } catch (error) {
      errorHandle(error);
    }
  };

  // const item: NewsItem = fetchCurrentNewsItem(newsItem);
  // console.log('item', item);


  if (!item) {
    return (<h2>Loading...</h2>)
  }

  const { by, text, time, score, kids } = item;

  return (
    <>
      <span>{comment}</span>
      <p>Author: {by}</p>
      <p>Text: {text}</p>
      <p>Time: {convertUnixTimeToDate(time)}</p>
      {kids && <button onClick={() => {setOpenKids(true)}}>Open comments</button>}
      {openKids && <Comments comments={kids} />}
    </>
  );
}

export default Comment;