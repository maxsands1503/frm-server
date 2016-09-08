var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var queries = require('../queries/apiQueries');
var lists = require('../queries/listQueries');
var listItems = require('../queries/listItemQueries');
module.exports = router;

router.get('/', function(req, res, next){
  var user_id = //**GET JSON WEB TOKEN DATA**
  lists.all(user_id).then(function(lists){
    res.json(lists);
  })
});
router.post('/', function(req, res, next){
  lists.create(req.body).then(function(data){
    res.json(data);
  })
});
router.get('/:id', function(req, res, next){
  lists.find(req.params.id).first().then(function(list){
    listItems.all(list.id).then(function(listItems){
      res.json({list:list,listItems:listItems});
    })
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
  listItems.deleteAll(req.params.id).then(function(){
    lists.delete(req.params.id).then(function(data){
      res.json('list deleted');
    })
  })
});
