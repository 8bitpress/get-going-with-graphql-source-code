const { createProxyMiddleware } = require("http-proxy-middleware");

const target = "http://localhost:4000";

module.exports = function (app) {
  app.use("/graphql", createProxyMiddleware("/graphql", { target, ws: true }));
};
