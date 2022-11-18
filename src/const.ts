export const MAIN_PAGE_UPDATE_INTERVAL = 60000;
export const MAX_NEWS = 100;

export enum NameSpace {
  data = 'DATA',
  comments = 'COMMENTS'
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  NOT_FOUND = 404
}

export enum AppRoute {
  Item = '/item',
  Root = '/',
  NotFound = '*'
}

export enum APIRoute {
  News = '/',
  Item = '/item'
}
