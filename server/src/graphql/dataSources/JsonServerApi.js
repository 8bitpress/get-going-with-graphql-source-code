import { ForbiddenError, UserInputError } from "apollo-server";
import { RESTDataSource } from "apollo-datasource-rest";
import parseLinkHeader from "parse-link-header";

class JsonServerApi extends RESTDataSource {
  baseURL = process.env.REST_API_BASE_URL;
  defaultLimit = 20;

  async didReceiveResponse(response) {
    if (response.ok) {
      this.linkHeader = response.headers.get("Link");
      this.totalCountHeader = response.headers.get("X-Total-Count");
      return this.parseBody(response);
    } else {
      throw await this.errorFromResponse(response);
    }
  }

  // UTILS

  async checkUniqueUserData(email, username) {
    const res = await Promise.all([
      this.get(`/users?email=${email}`),
      this.get(`/users?username=${username}`)
    ]);
    const [existingEmail, existingUsername] = res;

    if (existingEmail.length) {
      throw new UserInputError("Email is already in use");
    } else if (existingUsername.length) {
      throw new UserInputError("Username already in use");
    }
  }

  parsePageInfo({ limit, page }) {
    if (this.totalCountHeader) {
      let hasNextPage, hasPrevPage;

      if (this.linkHeader) {
        const { next, prev } = parseLinkHeader(this.linkHeader);
        hasNextPage = !!next;
        hasPrevPage = !!prev;
      }

      return {
        hasNextPage: hasNextPage || false,
        hasPrevPage: hasPrevPage || false,
        page: page || 1,
        perPage: limit || this.defaultLimit,
        totalCount: this.totalCountHeader
      };
    }

    return null;
  }

  parseParams({ limit, orderBy, page, ...rest }) {
    if (limit && limit > 100) {
      throw new UserInputError("Maximum of 100 results per page");
    }

    const paginationParams = [];
    const [sort, order] = orderBy.split("_");
    paginationParams.push(
      `_limit=${limit || this.defaultLimit}`,
      `_page=${page || "1"}`,
      `_sort=${sort}`,
      `_order=${order}`
    );

    const otherParams = Object.keys(rest).map(key => `${key}=${rest[key]}`);
    const queryString = [...paginationParams, ...otherParams].join("&");

    return queryString ? `?${queryString}` : "";
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

  async getAuthors({ limit, orderBy, page }) {
    const queryString = this.parseParams({
      ...(limit && { limit }),
      ...(page && { page }),
      orderBy: orderBy ? orderBy : "name_asc"
    });
    const authors = await this.get(`/authors${queryString}`);
    const pageInfo = this.parsePageInfo({ limit, page });

    return { results: authors, pageInfo };
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

  async getBookReviews(bookId, { limit, orderBy, page }) {
    const queryString = this.parseParams({
      ...(limit && { limit }),
      ...(page && { page }),
      bookId,
      orderBy: orderBy ? orderBy : "createdAt_desc"
    });
    const reviews = await this.get(`/reviews${queryString}`);
    const pageInfo = this.parsePageInfo({ limit, page });

    return { results: reviews, pageInfo };
  }

  async getBooks({ limit, orderBy, page }) {
    const queryString = this.parseParams({
      ...(limit && { limit }),
      ...(page && { page }),
      orderBy: orderBy ? orderBy : "title_asc"
    });
    const books = await this.get(`/books${queryString}`);
    const pageInfo = this.parsePageInfo({ limit, page });

    return { results: books, pageInfo };
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

  async getUserLibrary(userId, { limit, orderBy, page }) {
    const queryString = this.parseParams({
      _expand: "book",
      ...(limit && { limit }),
      ...(page && { page }),
      orderBy: orderBy ? orderBy : "createdAt_desc",
      userId
    });
    const items = await this.get(`/userBooks${queryString}`);
    const books = items.map(item => item.book);
    const pageInfo = this.parsePageInfo({ limit, page });

    return { results: books, pageInfo };
  }

  async getUserReviews(userId, { limit, orderBy, page }) {
    const queryString = this.parseParams({
      ...(limit && { limit }),
      ...(page && { page }),
      orderBy: orderBy ? orderBy : "createdAt_desc",
      userId
    });
    const reviews = await this.get(`/reviews${queryString}`);
    const pageInfo = this.parsePageInfo({ limit, page });

    return { results: reviews, pageInfo };
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
