export enum NameSpace {
  data = 'DATA',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export enum AppRoute {
  Item = '/item',
  Root = '/',
  NotFound = '*'
}

// TODO
export enum APIRoute {
  News = '/',
  NewsItem = '/item',
  Comments = '/comments'
}

export const mainPageUpdateInterval = 60000;