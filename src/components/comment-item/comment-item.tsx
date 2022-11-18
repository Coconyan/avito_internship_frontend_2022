import {
  useState,
  useEffect
} from "react";
import ContentLoader from "react-content-loader";
import {
  convertUnixTimeToDate,
  fetchCommentItem
} from "../../utils";
import CommentsList from "../comments-list/comments-list";
import {
  Button,
  Comment
} from 'semantic-ui-react';
import { CommentType } from "../../types/comment";
import { getCommentsList } from "../../store/comments/selectors";
import { useAppSelector } from "../../hooks";

type PropsType = {
  comment: number;
  updateState: number;
};

function CommentItem({ comment, updateState }: PropsType): JSX.Element {
  const visibleComments = useAppSelector(getCommentsList);
  const [commentItem, setCommentItem] = useState<CommentType | null>(null);
  const [openKids, setOpenKids] = useState(false);

  useEffect(() => {
    fetchCommentItem(Number(comment), setCommentItem);
  }, [comment, updateState]);

  if (!commentItem) {
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

  const { by, text, time, kids, deleted } = commentItem;

  if (deleted) return (<></>);

  const kidsIncludesHandler = () => {
    kids?.forEach((kid) => {
      if (visibleComments.includes(kid)) {
        return false;
      }
    })
    return true;
  }

  return (
    <Comment>
      <Comment.Content>
        <Comment.Author>{by}</Comment.Author>
        <Comment.Metadata>
          <div>{convertUnixTimeToDate(time)}</div>
        </Comment.Metadata>
        <Comment.Text>{text}</Comment.Text>
      </Comment.Content>
      {kids && kidsIncludesHandler() && !openKids && <Button onClick={() => { setOpenKids(true) }}>Open comments</Button>}
      {openKids && <CommentsList comments={kids} noHeader={true} updateState={updateState} />}
    </Comment>
  );
}

export default CommentItem;