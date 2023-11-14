exports.handlePSQLErrors = (err, req, res, next) => {
  console.log(err)
  if (err.code === '22P02') {
    res.status(400).send({ msg: "Bad Request" });
  } else if (
    err.code === "23503" &&
    err.detail === 'Key (article_id)=(93) is not present in table "articles".'
  ) {
    next({ code : 404, msg : "Article"})
} 
else if (err.code === "23503") {
  res.status(400).send({ msg: "Please provide valid username and body keys" });
} 
else if(err.code === '23502'){
  res.status(400).send({msg : 'Please provide a valid inc_votes key'})
}else {
  next(err);
}
};

exports.handleEmptyRowErrors = (err, req, res, next) => {
    if (err.code === 404){
        res.status(404).send({msg: `${err.msg} not found`})
    }
}

exports.handleServerErrors = (err, req, res, next) => {
      console.log(err);
      res.status(500).send({ msg: "Server Error" });
}

exports.handleUnplannedEndpoints = (req, res) => {
    res.status(404).send({ msg: 'Page not found'})
}