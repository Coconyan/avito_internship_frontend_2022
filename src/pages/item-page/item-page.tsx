import {
  useEffect,
  useState
} from 'react';
import ContentLoader from 'react-content-loader';
import { useParams } from 'react-router-dom';
import {
  Button,
  Container
} from 'semantic-ui-react';
import CommentsList from '../../components/comments-list/comments-list';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import { fetchCurrentNews } from '../../store/api-actions';
import { getCommentsLoading } from '../../store/comments/selectors';
import { getCurrentNews } from '../../store/data/selectors';

function ItemPage(): JSX.Element {
  const newsItem = useAppSelector(getCurrentNews);
  const isCommentsLoading = useAppSelector(getCommentsLoading);
  const dispatch = useAppDispatch();
  const [updateState, setUpdateState] = useState(0);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (newsItem === null || newsItem.id !== Number(id)) {
      dispatch(fetchCurrentNews(Number(id)));
    }
  }, [dispatch, id, newsItem]);

  if (!newsItem || newsItem.id !== Number(id)) {
    return (
      <Container>
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
      </Container>
    );
  }

  const { by, url, title, time, descendants, kids } = newsItem;
  const date = new Date(time * 1000);

  return (
    <Container>
      <h1>{title}</h1>

      <p>Author: {by}</p>
      <p>Time: {date.toLocaleString()}</p>
      <p>Comments Count: {descendants}</p>
      <p>
        <a href={url}>{url}</a>
      </p>
      <Container textAlign='left' >
        <Button
          loading={isCommentsLoading}
          disabled={isCommentsLoading}
          onClick={() => {
            dispatch(fetchCurrentNews(newsItem.id));
            setUpdateState(updateState + 1);
          }
          }
        >
          Update comments
        </Button>
      </Container>

      {descendants > 0 && <CommentsList comments={kids} updateState={updateState} />}
    </Container>
  );

}

export default ItemPage;