const db = require("../db/connection.js");

exports.selectArticleById = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then((response) => {
        if (response.rows.length === 0){
            throw {code : 404}
        }
      return response.rows[0];
    });
};
