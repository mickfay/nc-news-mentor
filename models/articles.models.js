const db = require("../db/connection.js");

exports.selectArticleById = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then((response) => {
        if(response.rows.length === 0){
            throw {code : 404, msg : 'Article'}
        }
      return response.rows[0];
    });
};

exports.selectArticles = () => {
  return db
    .query(
      `WITH comment_tally as (SELECT article_id, COUNT(comment_id) as comment_count from comments GROUP BY article_id)
      SELECT a.article_id, a.title, a.topic, a.author, a.created_at, a.votes, a.article_img_url, COALESCE(CAST(c.comment_count AS INTEGER), 0)  as comment_count
      FROM articles as a 
      LEFT OUTER JOIN comment_tally as c
      USING(article_id) 
      ORDER BY created_at DESC;`
    )
    .then((response) => {
      return response.rows;
    });
};

exports.selectCommentsById = (id) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`, [id]).then((response) => {
        return response.rows
    })
}