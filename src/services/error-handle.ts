import request from 'axios';
import { toast } from 'react-toastify';
import { ErrorType } from '../types/error';
import { AppRoute, HTTP_CODE } from '../const';
import { store } from '../store';
import { redirectToRoute } from '../store/actions';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
      case HTTP_CODE.NOT_FOUND:
        store.dispatch(redirectToRoute(AppRoute.NotFound));
        toast.error(response.statusText);
        break;
      default: toast.error('unknown error');
    }
  }
};
