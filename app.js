const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controllers.js");
const { getEndpoints } = require("./controllers/endpoints.controllers.js");
const {
  getArticleById,
  getArticles,
  getCommentsById,
  postComment,
} = require("./controllers/articles.controllers.js");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsById);

app.post("/api/articles/:article_id/comments", postComment);

app.get("*", () => {
  res.status(404).send({ msg: "Page not found" });
});

app.use((err, req, res, next) => {
  const psqlRegex = /(22P02)/;
  if (psqlRegex.test(err.code)) {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === 400 || err.code === '23503') {
    res.status(400).send({ msg: "Please provide a valid username and body" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === 404) {
    res.status(404).send({ msg: `${err.msg} not found` });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server Error" });
});

module.exports = app;
