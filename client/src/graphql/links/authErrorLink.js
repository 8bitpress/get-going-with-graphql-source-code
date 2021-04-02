import { onError } from "@apollo/client/link/error";

import { history } from "../../routes";

const authErrorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    const notAuthorizedError = graphQLErrors.find(
      error => error.message === "Not Authorised!"
    );

    if (notAuthorizedError) {
      const expiresAt = localStorage.getItem("token_expires_at");
      const isAuthenticated = expiresAt
        ? new Date().getTime() < expiresAt
        : false;

      if (!isAuthenticated) {
        history.push("/login");
      }
    }
  }
});

export default authErrorLink;
