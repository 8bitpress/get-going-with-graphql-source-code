import { ForbiddenError } from "apollo-server";
import { RESTDataSource } from "apollo-datasource-rest";

class JsonServerApi extends RESTDataSource {
  baseURL = process.env.REST_API_BASE_URL;

  // UTILS

  async checkUniqueUserData(email, username) {
    const res = await Promise.all([
      this.get(`/users?email=${email}`),
      this.get(`/users?username=${username}`)
    ]);
    const [existingEmail, existingUsername] = res;

    if (existingEmail.length) {
      throw new ForbiddenError("Email is already in use");
    } else if (existingUsername.length) {
      throw new ForbiddenError("Username already in use");
    }
  }

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

  getReviewById(id) {
    return this.get(`/reviews/${id}`).catch(
      err => err.message === "404: Not Found" && null
    );
  }

  async getUser(username) {
    const [user] = await this.get(`/users?username=${username}`);
    return user;
  }

  getUserById(id) {
    return this.get(`/users/${id}`).catch(
      err => err.message === "404: Not Found" && null
    );
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

  async createBook({ authorIds, cover, genre, summary, title }) {
    const book = await this.post("/books", {
      ...(cover && { cover }),
      ...(genre && { genre }),
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
      bookId: parseInt(bookId),
      createdAt: new Date().toISOString(),
      rating,
      userId: parseInt(reviewerId)
    });
  }

  async signUp({ email, name, username }) {
    await this.checkUniqueUserData(email, username);
    return this.post("/users", {
      createdAt: new Date().toISOString(),
      email,
      name,
      username
    });
  }

  // UPDATE

  async addBooksToLibrary({ bookIds, userId }) {
    const response = await Promise.all(
      bookIds.map(bookId =>
        this.get(`/userBooks/?userId=${userId}&bookId=${bookId}`)
      )
    );
    const existingUserBooks = response.flat();
    const newBookIds = bookIds.filter(
      bookId => !existingUserBooks.find(book => book.id === parseInt(bookId))
    );

    await Promise.all(
      newBookIds.map(bookId =>
        this.post("/userBooks", {
          bookId: parseInt(bookId),
          createdAt: new Date().toISOString(),
          userId: parseInt(userId)
        })
      )
    );

    return this.get(`/users/${userId}`);
  }

  async removeBooksFromLibrary({ bookIds, userId }) {
    const response = await Promise.all(
      bookIds.map(bookId =>
        this.get(`/userBooks/?userId=${userId}&bookId=${bookId}`)
      )
    );
    const existingUserBooks = response.flat();

    await Promise.all(
      existingUserBooks.map(({ id }) => this.delete(`/userBooks/${id}`))
    );

    return this.get(`/users/${userId}`);
  }

  updateReview({ id, rating, text }) {
    return this.patch(`reviews/${id}`, {
      rating,
      ...(text && { text })
    });
  }

  // DELETE

  async deleteReview(id) {
    await this.delete(`/reviews/${id}`);
    return true;
  }
}

export default JsonServerApi;
