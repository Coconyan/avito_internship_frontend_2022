import ContentLoader from "react-content-loader";
import { Item } from "semantic-ui-react";
import { useAppSelector } from "../../hooks";
import { getUnloadedNewsItems } from "../../store/data/selectors";
import { NewsItem } from "../../types/news";
import { convertUnixTimeToDate } from "../../utils";

type PropsType = {
  newsItem: NewsItem;
};

function NewsListItem({ newsItem }: PropsType): JSX.Element {
  const unloadedNewsItems = useAppSelector(getUnloadedNewsItems);

  if (unloadedNewsItems.length > 0) {
    return (
      <ContentLoader
        speed={2}
        width={400}
        height={95}
        viewBox="0 0 400 95"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="10" y="105" rx="5" ry="5" width="220" height="10" />
        <rect x="8" y="80" rx="5" ry="5" width="140" height="10" />
        <rect x="8" y="32" rx="5" ry="5" width="120" height="10" />
        <rect x="8" y="58" rx="5" ry="5" width="80" height="10" />
        <rect x="8" y="8" rx="5" ry="5" width="392" height="10" />
      </ContentLoader >
    );
  }

  const { by, title, time, score } = newsItem;

  return (
    <Item>
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Meta>Author: {by}</Item.Meta>
        <Item.Description>
          Score: {score}
        </Item.Description>
        <Item.Extra>{convertUnixTimeToDate(time)}</Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default NewsListItem;
