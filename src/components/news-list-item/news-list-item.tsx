import {
  useEffect,
  useState
} from "react";
import ContentLoader from "react-content-loader";
import { Item } from "semantic-ui-react";
import { APIRoute } from "../../const";
import { errorHandle } from "../../services/error-handle";
import { api } from "../../store";
import { NewsItem } from "../../types/news";
import { convertUnixTimeToDate } from "../../utils";

type PropsType = {
  newsItem: number;
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

  const { by, title, time, score } = item;

  return (
    <Item>
      <Item.Content>
        <Item.Header as='a'>{title}</Item.Header>
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
