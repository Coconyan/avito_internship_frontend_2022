import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { data } from './data/data';

export const rootReducer = combineReducers({
  [NameSpace.data]: data.reducer,
});
