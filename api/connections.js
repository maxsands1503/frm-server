var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var queries = require('../queries/apiQueries');
module.exports = router;

router.get('/', function(req, res, next){
  console.log("*******WIN****");
  queries.test().then(function(data){
    res.json({test:'hello'});
      });
});
