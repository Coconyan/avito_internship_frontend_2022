import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mainPageUpdateInterval } from "../../const";
import { useAppSelector } from "../../hooks";
import { store } from "../../store";
import { fetchNewsAction } from "../../store/api-actions";
import { getNews } from "../../store/data/selectors";
import NewsListItem from "../news-list-item/news-list-item";

function NewsList(): JSX.Element {
  const news = useAppSelector(getNews);
  const [intervalState, setIntervalState] = useState(0);
  // todo naming variables

  useEffect(() => {
    const interval = setInterval(() => {
      store.dispatch(fetchNewsAction());
      // console.log(Date.now());
    }, mainPageUpdateInterval);

    return () => clearInterval(interval);
  }, [intervalState])

  return (
    <ul>
      <button
        onClick={() => {
          store.dispatch(fetchNewsAction());
          setIntervalState(intervalState + 1);
        }}
      >
          update!
        </button>
      {news && news.slice(0, 100).map((item) => (
        <li key={item}>
          <Link to={`/items/${item}`} >
            <NewsListItem newsItem={item} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;