var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var queries = require('../queries/apiQueries');
module.exports = router;

function Connections(){
  return knex('connections');
}

router.post('/', function(req, res, next){
  var input = req.body;
  input.user_id = //***GET JSON WEB TOKEN***
  Connections().createConnection(input).then(function(data){
    res.json(data);
  })
});

router.get('/:id', function(req, res, next){
  Connections().getOneConnection(req.params.id).then(function(connection){
    res.json(connection);
  })
});

router.post('/:id', function(req, res, next){
  var input = req.body;
  input.user_id = //***GET JSON WEB TOKEN***
  Connections().editConnection(input);
});

router.get('/:id/delete', function(req, res, next){
  Connections().deleteConnection(req.params.id);
});
