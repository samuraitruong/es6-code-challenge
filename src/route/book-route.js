import {
  Router as router,
} from 'express';
import BookController from '../controller/book-controller';
import {
  BookRepository,
} from '../db';

export default ({
  config,
}) => {
  // support better for unit test
  const bookController = new BookController(new BookRepository(config));
  const api = router();

  api.get('/:id', bookController.get.bind(bookController));
  api.delete('/:id', bookController.delete.bind(bookController));
  api.put('/:id', bookController.update.bind(bookController));
  api.get('/', bookController.list.bind(bookController));
  api.post('/', bookController.post.bind(bookController));
  return api;
};
