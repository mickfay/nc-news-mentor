const express = require("express");
const { getTopics } = require("./controllers/topics.controllers.js");
const { getEndpoints } = require("./controllers/endpoints.controllers.js");
const {
  getArticleById,
  getArticles,
  getCommentsById,
  postComment,
  patchArticleById
} = require("./controllers/articles.controllers.js");
const {
  handlePSQLErrors,
  handleEmptyRowErrors,
  handleServerErrors,
  handleUnplannedEndpoints,
} = require("./error_handling.js");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsById);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticleById)

app.get("*", handleUnplannedEndpoints);

app.use(handlePSQLErrors);

app.use(handleEmptyRowErrors);

app.use(handleServerErrors);

module.exports = app;
