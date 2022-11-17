export type NewsItem = {
  by: string,
  descendants: number,
  id: number,
  score: number,
  kids?: [number],
  time: number,
  title: string,
  type: string,
  url: string,
};

export type News = [number];
