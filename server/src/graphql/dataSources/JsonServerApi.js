import { RESTDataSource } from "apollo-datasource-rest";

class JsonServerApi extends RESTDataSource {
  baseURL = process.env.REST_API_BASE_URL;

  // READ

  getAuthorById(id) {
    return this.get(`/authors/${id}`);
  }

  async getAuthorBooks(authorId) {
    const items = await this.get(`/authors/${authorId}/books`);
    return items.map(item => item.book);
  }

  getAuthors() {
    return this.get(`/authors`);
  }

  getBookById(id) {
    return this.get(`/books/${id}`);
  }

  async getBookAuthors(bookId) {
    const items = await this.get(`/books/${bookId}/authors`);
    return items.map(item => item.author);
  }

  getBookReviews(bookId) {
    return this.get(`/reviews?bookId=${bookId}`);
  }

  getBooks() {
    return this.get(`/books`);
  }

  async getUser(username) {
    const [user] = await this.get(`/users?username=${username}`);
    return user;
  }

  getUserById(id) {
    return this.get(`/users/${id}`);
  }

  async getUserLibrary(userId) {
    const items = await this.get(`/users/${userId}/books`);
    return items.map(item => item.book);
  }

  getUserReviews(userId) {
    return this.get(`/reviews?userId=${userId}`);
  }

  // CREATE
  createAuthor(name) {
    return this.post("/authors", { name });
  }
}

export default JsonServerApi;
