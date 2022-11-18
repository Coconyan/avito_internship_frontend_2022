import {
  useState,
  useEffect
} from "react";
import {
  Button,
  Container
} from "semantic-ui-react";
import NewsList from "../../components/news-list/news-list";
import { MAIN_PAGE_UPDATE_INTERVAL } from "../../const";
import { useAppSelector } from "../../hooks";
import { store } from "../../store";
import { fetchNewsAction } from "../../store/api-actions";
import {
  getNewsItems,
  getNewsLoading
} from "../../store/data/selectors";

function MainPage(): JSX.Element {
  const isLoading = useAppSelector(getNewsLoading);
  const [intervalState, setIntervalState] = useState(0);
  const newsItems = useAppSelector(getNewsItems);

  useEffect(() => {
    const interval = setInterval(() => {
      store.dispatch(fetchNewsAction());
    }, MAIN_PAGE_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [intervalState])

  return (
    <Container>
      <h1>HACKER NEWS</h1>
      <Container textAlign='right' >
        <Button
          basic
          loading={isLoading}
          disabled={isLoading}
          onClick={() => {
            store.dispatch(fetchNewsAction());
            setIntervalState(intervalState + 1);
          }}
        >
          Reload
        </Button>
      </Container>
      <NewsList newsItems={newsItems} />
    </Container>
  );
}

export default MainPage;