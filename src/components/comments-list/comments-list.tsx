import CommentItem from '../comment-item/comment-item';
import {
  Comment,
  Header
} from 'semantic-ui-react';

type PropsType = {
  comments: [number] | undefined;
  noHeader?: boolean;
  openKids?: boolean;
};

function CommentsList({ comments, noHeader = false, openKids = false }: PropsType): JSX.Element {
  return (
    <Comment.Group>
      {!noHeader && (
        <Header as='h3' dividing>
          Comments
        </Header>
      )
      }
      {comments && comments.map((comment) => (
        <CommentItem key={comment} comment={comment} />
      ))}
    </Comment.Group>
  );
}

export default CommentsList;