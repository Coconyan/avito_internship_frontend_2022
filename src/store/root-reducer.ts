import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { data } from './data/data';
// import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.data]: data.reducer,
  // [NameSpace.user]: userProcess.reducer,
});
