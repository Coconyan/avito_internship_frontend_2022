import { Link } from "react-router-dom";
import {
  Item,
  List
} from "semantic-ui-react";
import { NewsItem } from "../../types/news";
import NewsListItem from "../news-list-item/news-list-item";

type PropsType = {
  newsItems: NewsItem[] | null;
}

function NewsList({ newsItems }: PropsType): JSX.Element {
  return (
    <List divided relaxed>
      {newsItems && newsItems.map((item: NewsItem) => (
        <List.Item key={item.id}>
          <Link to={`/items/${item.id}`} >
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