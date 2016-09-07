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
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;