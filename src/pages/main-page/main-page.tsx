import { Container } from "semantic-ui-react";
import NewsList from "../../components/news-list/news-list";

function MainPage(): JSX.Element {
  return (
    <Container>
      <h1>HACKER NEWS</h1>
      <NewsList />
    </Container>
  );
}

export default MainPage;