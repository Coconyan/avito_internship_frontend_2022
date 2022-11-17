import CommentItem from '../comment-item/comment-item';
import {
  Comment,
  Header
} from 'semantic-ui-react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setComments } from '../../store/comments/comments';
import { getComments } from '../../store/comments/selectors';
import { data } from '../../store/data/data';

type PropsType = {
  comments: number[] | undefined;
  noHeader?: boolean;
  openKids?: boolean;
};

function CommentsList({ comments, noHeader = false, openKids = false }: PropsType): JSX.Element {
  const visibleComments = useAppSelector(getComments);
  const dispatch = useAppDispatch();

  !visibleComments && dispatch(setComments(comments));

  if (comments && visibleComments) {
    comments.forEach(comment => {
      if (!visibleComments.includes(comment)) {
        let visibileCommentsWithNew = visibleComments.slice();
        visibileCommentsWithNew.push(comment);
        dispatch(setComments(visibileCommentsWithNew));
      }
    });
  }

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