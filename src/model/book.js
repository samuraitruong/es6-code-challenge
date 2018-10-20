export default class Book {
  constructor({
    title,
    id,
    author,
    language,
    year,
    pages,
    imageLink,
    country,
    link,
  }) {
    this.title = title;
    this.id = id;
    this.author = author;
    this.language = language;
    this.year = year;
    this.pages = pages;
    this.imageLink = imageLink;
    this.country = country;
    this.link = link;
  }
  isValid() {
    return this.title && this.author;
  }
}
