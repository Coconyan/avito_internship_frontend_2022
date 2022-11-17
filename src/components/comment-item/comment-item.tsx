import {
  useState,
  useEffect
} from "react";
import ContentLoader from "react-content-loader";
import { APIRoute } from "../../const";
import { errorHandle } from "../../services/error-handle";
import { api } from "../../store";
import { convertUnixTimeToDate } from "../../utils";
import CommentsList from "../comments-list/comments-list";
import {
  Button,
  Comment
} from 'semantic-ui-react';
import { CommentType } from "../../types/comment";


type PropsType = {
  comment: number;
};

function CommentItem({ comment }: PropsType): JSX.Element {
  const [item, setItem] = useState<CommentType | null>(null);
  const [openKids, setOpenKids] = useState(false);

  useEffect(() => {
    fetchCurrentNewsItem(Number(comment));
  }, []);

  const fetchCurrentNewsItem = async (id: number) => {
    try {
      const { data } = await api.get<CommentType>(`${APIRoute.NewsItem}/${id}.json`);
      setItem(data);
      console.log(data);
    } catch (error) {
      errorHandle(error);
    }
  };

  if (!item) {
    return (
      <ContentLoader
        speed={2}
        width={400}
        height={90}
        viewBox="0 0 400 90"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="8" y="15" rx="5" ry="5" width="100" height="10" />
        <rect x="8" y="35" rx="5" ry="5" width="380" height="30" />
        <rect x="8" y="75" rx="5" ry="5" width="120" height="10" />
      </ContentLoader>
    );
  }

  const { by, text, time, kids } = item;

  return (
    <Comment>
      <Comment.Content>
        <Comment.Author>{by}</Comment.Author>
        <Comment.Metadata>
          <div>{convertUnixTimeToDate(time)}</div>
        </Comment.Metadata>
        <Comment.Text>{text}</Comment.Text>
      </Comment.Content>
      {kids && !openKids && <Button onClick={() => { setOpenKids(true) }}>Open comments</Button>}
      {openKids && <CommentsList comments={kids} noHeader={true} openKids={openKids} />}
    </Comment>
  );
}

export default CommentItem;