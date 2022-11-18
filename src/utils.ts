import { APIRoute } from "./const";
import { errorHandle } from "./services/error-handle";
import {
  api,
  store
} from "./store";
import {
  setCommentsList,
  setCommentsLoading
} from "./store/comments/comments";
import { CommentType } from "./types/comment";
import { NewsItem } from "./types/news";

export const convertUnixTimeToDate = (unixTime: number) => {
  const time = new Date(unixTime * 1000);
  return time.toLocaleString();
}

export const fetchItem = async (id: number, setItem?: React.Dispatch<React.SetStateAction<any>>) => {
  try {
    const { data } = await api.get<CommentType | NewsItem>(`${APIRoute.Item}/${id}.json`);
    setItem && setItem(data);
  } catch (error) {
    errorHandle(error);
  }
};

export const fetchCommentItem = async (id: number, setItem?: React.Dispatch<React.SetStateAction<any>>) => {
  try {
    store.dispatch(setCommentsLoading(true));
    const visibleComments = store.getState().COMMENTS.commentsList;

    // add new comments id to comments list
    if (!visibleComments.includes(id)) {
      let visibileCommentsWithNew = visibleComments.slice();
      visibileCommentsWithNew.push(id);
      store.dispatch(setCommentsList(visibileCommentsWithNew));
    }

    const { data } = await api.get<CommentType>(`${APIRoute.Item}/${id}.json`);
    setItem && setItem(data);
    store.dispatch(setCommentsLoading(false));
  } catch (error) {
    errorHandle(error);
  }
};
