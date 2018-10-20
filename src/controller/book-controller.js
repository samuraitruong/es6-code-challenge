import {
  BookRepository,
} from '../db';
import {
  internalError,
  success,
  notFound,
  badRequest,
} from '../common/response';
import Book from '../model/book';
import logger from '../common/logger';

/**
 * Get Book function
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export default class BookController {
  /**
   * @param {BookRepository} bookRepository
   */
  constructor(bookRepository) {
    this.bookRepository = bookRepository || new BookRepository();
  }
  async get(req, res, next) {
    const {
      id,
    } = req.params;
    try {
      const item = await this.bookRepository.getItem(parseInt(id, 10));
      item ? success(res, item) : notFound(res, `Book with ID =${id} not found`, {
        id,
      });
    } catch (err) {
      logger.error('get item error : %j', err);
      internalError(res, err);
    }
  }
  async delete(req, res, next) {
    const id = parseInt(req.params.id) || 0;
    try {
      const removedItem = await this.bookRepository.removeItem(id);

      removedItem ? success(res, removedItem) : notFound(res, 'Book not found', {
        id,
      });
    } catch (err) {
      logger.error('Delete item error : %j', err);
      internalError(res, err);
    }
  }
  async post(req, res, next) {
    try {
      const {
        body,
      } = req;
      const request = new Book(body);
      // TODO in real project we should you validation library
      // Asummed title & author is required
      if (!request.isValid()) {
        return badRequest(res, 'title and author is required field', request);
      }
      const book = await this.bookRepository.addItem(request);
      success(res, book);
    } catch (err) {
      logger.error('create item error : %j', err);
      internalError(res, err);
    }
  }

  async update(req, res, next) {
    // make sure we only get the field we want
    try {
      const {
        body,
      } = req;
      const request = new Book(body);
      const id = parseInt(req.params.id || 0, 10);

      // TODO in real project we should you validation library
      // Asummed title & author is required
      if (!request.isValid()) {
        return badRequest(res, 'title and author is required field', request);
      }
      const existing = await this.bookRepository.getItem(id);
      if (!existing) {
        return notFound(res, 'Book not found', {
          id,
        });
      }
      const book = await this.bookRepository.updateItem({...request,
        id,
      });
      success(res, book);
    } catch (err) {
      logger.error('update item error : %j', err);
      internalError(res, err);
    }
  }


  /**
   * List all items
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async list(req, res, next) {
    try {
      const books = await this.bookRepository.getAll();
      success(res, books);
    } catch (err) {
      logger.error('get list item error : %j', err);
      internalError(res, err);
    }
  }
}
