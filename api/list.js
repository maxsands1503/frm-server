var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var queries = require('../queries/apiQueries');
var lists = require('../queries/lists');
var listItems = require('../queries/listItemQueries')
module.exports = router;

router.get('/', function(req, res, next){
  var user_id = //**GET JSON WEB TOKEN DATA**
  lists.all(user_id).then(function(data){
    res.json(data);
  })
});
router.post('/', function(req, res, next){
  lists.create(req.body).then(function(data){
    res.json(data);
  })
});
router.get('/:id', function(req, res, next){
  lists.find(req.params.id).then(function(data){
    res.json(data);
  })
});
router.post('/:id', function(req, res, next){
  var list = req.body;
  list.id = req.params.id;
  lists.update(list).then(function(data){
    res.json('list updated')
  })
});
router.get('/:id/delete', function(req, res, next){
  listItems.deleteAll(req.params.id).then(function){
    lists.delete(req.params.id).then(function(data){
      res.json('list deleted');
    }
  })
});
