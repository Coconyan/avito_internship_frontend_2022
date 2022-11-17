import { createSlice } from '@reduxjs/toolkit';
import {
  NameSpace
} from '../../const';
import { Comments } from '../../types/state';

const initialState: Comments = {
  comments: null,
};

export const comments = createSlice({
  name: NameSpace.comments,
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    }
  },
});

export const { setComments } = comments.actions;
