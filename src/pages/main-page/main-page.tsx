import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NewsList from "../../components/news-list/news-list";
import { MAIN_PAGE_UPDATE_INTERVAL } from "../../const";
import { store } from "../../store";
import { fetchNewsAction } from "../../store/api-actions";

function MainPage(): JSX.Element {
  const [intervalState, setIntervalState] = useState(0);
  // todo naming variables

  useEffect(() => {
    // store.dispatch(fetchNewsAction());
    const interval = setInterval(() => {
      store.dispatch(fetchNewsAction());
    }, MAIN_PAGE_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [intervalState])

  return (
    <Container>
      <h1>HACKER NEWS</h1>
      <NewsList intervalState={intervalState} setIntervalState={setIntervalState} />
    </Container>
  );
}

// TODO Добавить в store массив всех новостей, сравнивать их id с массивом id

export default MainPage;