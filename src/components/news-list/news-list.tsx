import {
  useEffect,
  useState
} from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Item,
  List
} from "semantic-ui-react";
import { MAIN_PAGE_UPDATE_INTERVAL } from "../../const";
import { useAppSelector } from "../../hooks";
import { store } from "../../store";
import { fetchNewsAction } from "../../store/api-actions";
import {
  getNews,
  getNewsLoading
} from "../../store/data/selectors";
import NewsListItem from "../news-list-item/news-list-item";

function NewsList(): JSX.Element {
  const news = useAppSelector(getNews);
  const isLoading = useAppSelector(getNewsLoading);
  const [intervalState, setIntervalState] = useState(0);
  // todo naming variables

  useEffect(() => {
    const interval = setInterval(() => {
      store.dispatch(fetchNewsAction());
      // console.log(Date.now());
    }, MAIN_PAGE_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [intervalState])

  return (
    <List>
      <Button
        basic
        loading={isLoading}
        onClick={() => {
          store.dispatch(fetchNewsAction());
          setIntervalState(intervalState + 1);
        }} 
      >
        Reload
      </Button>
      {news && news.slice(0, 100).map((item) => (
        <List.Item key={item}>
          <Link to={`/items/${item}`} >
            <Item.Group>
              <NewsListItem newsItem={item} />
            </Item.Group>
          </Link>
        </List.Item>
      ))}
    </List>
  );
};

export default NewsList;