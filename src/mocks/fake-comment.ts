import { faker } from '@faker-js/faker';
import { CommentType } from '../types/comment';
import { News } from '../types/news';

export const makeFakeComment = (): CommentType => ({
  by: faker.internet.userName(),
  id: faker.datatype.number(),
  kids: [faker.datatype.number(), faker.datatype.number()],
  parent: faker.datatype.number(),
  text: faker.hacker.phrase(),
  time: faker.datatype.number({min: 1669000000, max: 1669123531}),
  type: 'comment',
} as CommentType);

export const makeFakeCommentsList = (): News => ([faker.datatype.number(), faker.datatype.number(), faker.datatype.number()] as News);
export const makeFakeComments = (): CommentType[] => ([makeFakeComment(), makeFakeComment(), makeFakeComment()] as CommentType[]);