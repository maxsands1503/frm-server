var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var queries = require('../queries/apiQueries')
//change to use the list.js file
var list = require('./list');
var connections = require('./connections')
router.use('/list', list);
router.use('/connections', connections);
module.exports = router;


/* GET home page. */
router.post('/', function(req, res, next) {
  res.json({message: "hello"})
});

module.exports = router;
