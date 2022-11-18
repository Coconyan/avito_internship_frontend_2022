import { createSlice } from '@reduxjs/toolkit';
import {
  NameSpace
} from '../../const';
import { Comments } from '../../types/state';

const initialState: Comments = {
  commentsList: [],
  commentsLoading: false,
};

export const comments = createSlice({
  name: NameSpace.comments,
  initialState,
  reducers: {
    setCommentsList: (state, action) => {
      state.commentsList = action.payload;
    },
    setCommentsLoading: (state, action) => {
      state.commentsLoading = action.payload;
    }
  },
});

export const { setCommentsList, setCommentsLoading } = comments.actions;
