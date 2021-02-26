import { ForbiddenError } from "apollo-server";
import { RESTDataSource } from "apollo-datasource-rest";

class JsonServerApi extends RESTDataSource {
  baseURL = process.env.REST_API_BASE_URL;

  // READ

  getAuthorById(id) {
    return this.get(`/authors/${id}`).catch(
      err => err.message === "404: Not Found" && null
    );
  }

  async getAuthorBooks(authorId) {
    const items = await this.get(`/authors/${authorId}/books`);
    return items.map(item => item.book);
  }

  getAuthors() {
    return this.get(`/authors`);
  }

  getBookById(id) {
    return this.get(`/books/${id}`).catch(
      err => err.message === "404: Not Found" && null
    );
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

  async createBook({ authorIds, cover, summary, title }) {
    const book = await this.post("/books", {
      ...(cover && { cover }),
      ...(summary && { summary }),
      title
    });

    if (authorIds) {
      await Promise.all(
        authorIds.map(authorId =>
          this.post("/bookAuthors", {
            authorId: parseInt(authorId),
            bookId: book.id
          })
        )
      );
    }
    return book;
  }

  async createReview({ bookId, rating, reviewerId, text }) {
    const existingReview = await this.get(
      `/reviews?bookId=${bookId}&userId=${reviewerId}`
    );

    if (existingReview.length) {
      throw new ForbiddenError("Users can only submit one review per book");
    }

    return this.post("/reviews", {
      ...(text && { text }),
      bookId,
      createdAt: new Date(),
      rating,
      userId: reviewerId
    });
  }
}

export default JsonServerApi;
