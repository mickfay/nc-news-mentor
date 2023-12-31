const {
  selectArticleById,
  selectArticles,
  selectCommentsById,
  insertComment,
  updateArticleById
} = require("../models/articles.models.js");

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  selectArticleById(articleId)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getCommentsById = (req, res, next) => {
  const id = req.params.article_id;
  selectArticleById(id)
    .then(() => {
      return selectCommentsById(id);
    })
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const body = req.body.body;
  const author = req.body.username;
  const article_id = +req.params.article_id;
  const created_at = new Date();
  const commentInfo = [0, created_at, author, body, article_id];
  if (commentInfo.includes(undefined)) {
    throw { code: '23503' };
  }
  insertComment(commentInfo)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};


exports.patchArticleById = (req, res, next) => {

  const votes = req.body.inc_votes
  const article_id = req.params.article_id

  updateArticleById([votes, article_id]).then((article) => {
    res.status(200).send({article})
  }).catch(next)

}