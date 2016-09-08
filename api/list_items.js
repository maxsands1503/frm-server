var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var queries = require('../queries/apiQueries');
var lists = require('../queries/listQueries');
var listItems = require('../queries/listItemQueries');
module.exports = router;

router.post('/', function(req, res, next){
  listItems.create(req.body).then(function(data){
    res.json(data);
  })
});
router.get('/:id', function(req, res, next){
  listItems.find(req.params.id).first().then(function(listItem){
    res.json(listItem);
  })
});
router.post('/:id', function(req, res, next){
  var listItem = req.body;
  listItem.id = req.params.id;
  listItems.update(list).then(function(data){
    res.json('list item updated')
  })
});
router.get('/:id/delete', function(req, res, next){
  listItems.deleteOne(req.params.id).then(function(){
    res.json('list item deleted');
  })
});
