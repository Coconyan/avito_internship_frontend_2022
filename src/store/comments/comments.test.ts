import { makeFakeCommentsList } from '../../mocks/fake-comment';
import {
  comments,
  setCommentsList,
  setCommentsLoading
} from './comments';

const commentsList = makeFakeCommentsList();
const state = {
  commentsList: [],
  commentsLoading: false,
};

describe('Reducer: comments', () => {
  it('without additional parameters should return initial state', () => {
    expect(comments.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        commentsList: [],
        commentsLoading: false,
      });
  });

  it('should update comments by load comments', () => {
    expect(comments.reducer(state, setCommentsList(commentsList)))
      .toEqual({
        commentsList: commentsList,
        commentsLoading: false,
      });
  });

  it('should update loaded status comments by set comments loading', () => {
    expect(comments.reducer(state, setCommentsLoading(true)))
      .toEqual({
        commentsList: [],
        commentsLoading: true,
      });
  });
});