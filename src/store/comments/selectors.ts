import { NameSpace } from "../../const";
import { State } from "../../types/state";

export const getCommentsList = (state: State): number[] => state[NameSpace.comments].commentsList;
export const getCommentsLoading = (state: State): boolean => state[NameSpace.comments].commentsLoading;
