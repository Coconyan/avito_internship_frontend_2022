import { Link } from "react-router-dom";
import {
  Button,
  Item,
  List
} from "semantic-ui-react";
import { useAppSelector } from "../../hooks";
import { store } from "../../store";
import { fetchNewsAction } from "../../store/api-actions";
import {
  getNews,
  getNewsLoading
} from "../../store/data/selectors";
import NewsListItem from "../news-list-item/news-list-item";

function NewsList({intervalState, setIntervalState}: any): JSX.Element {
  const news = useAppSelector(getNews);
  const isLoading = useAppSelector(getNewsLoading);

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
      {news && news.map((item) => (
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