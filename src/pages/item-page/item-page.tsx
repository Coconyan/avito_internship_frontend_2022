import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../../components/comments/comments';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCurrentNews } from '../../store/api-actions';
import { getCurrentNews, getCurrentNewsLoading } from '../../store/data/selectors';

function ItemPage(): JSX.Element {
  const newsItem = useAppSelector(getCurrentNews);
  const isLoading = useAppSelector(getCurrentNewsLoading);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();


  useEffect(() => {
    if (newsItem === null || newsItem.id !== Number(id)) {
      dispatch(fetchCurrentNews(Number(id)));
    }
  }, [id]);

  if (!newsItem || isLoading) {
    return (
      <h2>Loading...</h2>
    );
  }

  const { by, url, title, time, descendants, kids } = newsItem;
  const date = new Date(time * 1000);
  console.log(newsItem);

  return (
    <div>
      <h2>Title: {title}</h2>

      <p>Author: {by}</p>
      <p>Time: {time}</p>
      <p>Time: {date.toLocaleString()}</p>
      <p>Comments Count: {descendants}</p>
      <a href={url}>{url}</a>

      {kids && <Comments comments={kids} />}
    </div>
  );

}

export default ItemPage;