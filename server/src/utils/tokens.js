export function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.headers.cookie) {
    const tokenCookie = req.headers.cookie
      .split("; ")
      .find(cookie => cookie.includes("token"));

    return tokenCookie ? tokenCookie.split("=")[1] : null;
  }
  return null;
}

export function handleInvalidToken(err, req, res, next) {
  if (err.code === "invalid_token") {
    return next();
  }
  return next(err);
}
