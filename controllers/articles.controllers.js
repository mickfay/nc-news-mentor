const { selectArticleById, selectArticles, selectCommentsById } = require("../models/articles.models.js");

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  selectArticleById(articleId).then((article) => {
    res.status(200).send({ article });
  }).catch(next);
};

exports.getArticles = (res, req, next) => {
    selectArticles().then((articles) => {
        req.status(200).send({articles})
    }).catch(next)
}

exports.getCommentsById = (req, res, next) => {
    const id = req.params.article_id
    selectArticleById(id).then(() => {
        return selectCommentsById(id)
    }).then((comments)=> {
        res.status(200).send({comments})
    }).catch(next)
}