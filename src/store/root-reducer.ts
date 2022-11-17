import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { comments } from './comments/comments';
import { data } from './data/data';

export const rootReducer = combineReducers({
  [NameSpace.data]: data.reducer,
  [NameSpace.comments]: comments.reducer,
});
