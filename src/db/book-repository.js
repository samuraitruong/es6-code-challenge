import axios from 'axios';
import logger from '../common/logger';

export class BookRepository {
  constructor(config) {
    this.books = [];
    this.onFetchBooks = this.onFetchBooks.bind(this);
    if (config && config.source) {
      // fetch the this book
      this.fetchBooks(config.source);
    }
  }
  onFetchBooks(response) {
    logger.info(`Found ${response.data.length} books`);
    const {
      data,
    } = response;
    // data correction
    const books = data.map((data, index) => {
      return {...data,
        id: index + 1,
        link: (data.link || '').replace('\n', ''), // remove \n in data source link
      };
    });
    this.books = this.books.concat(books);
  }
  fetchBooks(url) {
    logger.info('Fetching book data', url);
    axios.get(url).then(this.onFetchBooks).catch((err) => logger.error('Error on prefectch data', err));
  }
  /** Simulate asynchonous action, this method will make action delay from 1-1000ms
   * @param {function} action
   * @return {Promise} the output of action
   */
  simulateAsync(action) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(action.call());
      }, Math.ceil(Math.random() * 1000));
    });
  }
  /**
   * Add new book to the books store
   * @param {Book} book : New book wih Id
   * @return {Promise<Book>} promise
   */
  async addItem(book) {
    return await this.simulateAsync(() => {
      // find max id in the list
      const lastId = this.books.reduce((current, prev) => current > prev.id ? current : prev.id, 0);
      book.id = lastId + 1;
      this.books.push(book);
      return book;
    });
  }
  /**
   * Return all books
   * @return {Promise<Book[]>}
   */
  async getAll() {
    return await this.simulateAsync(() => {
      return this.books;
    });
  }
  async getItem(id) {
    return await this.simulateAsync(() => {
      const bookIndex = this.books.findIndex((book) => book.id === id);
      if (bookIndex >= 0) {
        return this.books[bookIndex];
      }
      return null;
    });
  }
  async updateItem(updateBook) {
    return await this.simulateAsync(() => {
      const matchesBooks = this.books.filter((x) => x.id === updateBook.id);
      if (matchesBooks && matchesBooks.length > 0) {
        matchesBooks[0] = updateBook;
      };
      return matchesBooks;
    });
  }

  /**
   * remove the item match with Id
   * @param {number} id: book id
   * @return {Book} deleted item
   */
  async removeItem(id) {
    return await this.simulateAsync(() => {
      const find = this.books.findIndex((book, index) => book.id === id);
      if (find < 0) {
        return null;
      }
      const deletedBook = this.books.splice(find, 1);
      return deletedBook;
    });
  }
}
export default BookRepository;
