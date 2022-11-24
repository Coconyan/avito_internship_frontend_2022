import { faker } from '@faker-js/faker';
import { News, NewsItem } from '../types/news';

export const makeFakeNewsItem = (): NewsItem => ({
  by: faker.internet.userName(),
  descendants: faker.datatype.number(),
  id: faker.datatype.number(),
  score: faker.datatype.number(),
  kids: [faker.datatype.number(), faker.datatype.number()],
  time: faker.datatype.number({min: 1669000000, max: 1669123531}),
  title: faker.commerce.product(),
  type: 'story',
  url: faker.internet.url()
} as NewsItem);

export const makeFakeNewsList = (): News => ([faker.datatype.number(), faker.datatype.number(), faker.datatype.number()] as News);
export const makeFakeNewsItems = (): NewsItem[] => ([makeFakeNewsItem(), makeFakeNewsItem(), makeFakeNewsItem()] as NewsItem[]);