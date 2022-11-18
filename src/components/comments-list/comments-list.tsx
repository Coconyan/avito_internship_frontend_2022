import CommentItem from '../comment-item/comment-item';
import {
  Comment,
  Header
} from 'semantic-ui-react';
import {
  useAppSelector,
  useAppDispatch
} from '../../hooks';
import { setCommentsList } from '../../store/comments/comments';
import { getCommentsList } from '../../store/comments/selectors';

type PropsType = {
  comments: number[] | undefined;
  noHeader?: boolean;
  updateState: number;
};

function CommentsList({ comments, noHeader = false, updateState }: PropsType): JSX.Element {
  const visibleComments = useAppSelector(getCommentsList);
  const dispatch = useAppDispatch();

  !visibleComments && dispatch(setCommentsList(comments));

  return (
    <Comment.Group>
      {!noHeader && (
        <Header as='h3' dividing>
          Comments
        </Header>
      )
      }
      {comments && comments.map((comment) => (
        <CommentItem key={comment} comment={comment} updateState={updateState}/>
      ))}
    </Comment.Group>
  );
}

export default CommentsList;