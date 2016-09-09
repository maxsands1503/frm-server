var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var queries = require('../queries/apiQueries');
var Connections = require('../queries/connectionsQueries')
module.exports = router;


router.post('/', function(req, res, next){
  var input = req.body;
  var urlin = {};
  urlin.user_id = 1//***GET JSON WEB TOKEN***
  Connections.createConnection(input, urlin).then(function(data){
    res.json(data);
  })
});

router.get('/:id', function(req, res, next){
  Connections.getOneConnection(req.params.id).then(function(connection){
    res.json(connection);
  })
});

router.post('/:id', function(req, res, next){
  var input = req.body;
  var urlin = {};
  urlin.user_id = 1//**GET JSON WEB TOKEN***
  Connections.editConnection(input, urlin);
});

router.get('/:id/delete', function(req, res, next){
  var input = {};
  input.id = req.params.id
  Connections.deleteConnection(input);
});
