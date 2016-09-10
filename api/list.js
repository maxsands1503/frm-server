var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var queries = require('../queries/apiQueries');

var lists = require('../queries/listQueries');
var listItems = require('../queries/listItemQueries');
var listUsers = require('../queries/listUsersQueries');
var Connections = require('../queries/connectionsQueries');

module.exports = router;

router.get('/', function(req, res, next){
  var user_id = 1//**GET JSON WEB TOKEN DATA**
  lists.all(user_id).then(function(lists){
    res.json(lists);
  })
});

router.post('/', function(req, res, next){
  var input = req.body;
  input.user_id = Number(req.body.user_id);

  lists.create(input).then(function(){
    lists.findLatest(input.user_id).then(function(list){
      var listUserInput = {
        list_id: list.id,
        user_id: list.user_id,
        user_permission: 'edit',
        conn_id: null
      }
      listUsers.create(listUserInput).then(function(){
        if(list.list_type == 'private'){
          res.json('list added');
        } else {
          var connectionId = req.body.connection_id;
          Connections.getJustOneConnection(connectionId).then(function(connection){
            listUserInput.user_id = connection.conn_id;
            listUserInput.user_permission = 'read';
            listUserInput.conn_id = connection.id;
            listUsers.create(listUserInput).then(function(){
              res.json('list added');
            })
          })
        }
      })
    })
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
  listUsers.delete(req.params.id).then(function(){
    lists.delete(req.params.id).then(function(){
      res.json('list deleted');
    })
  })
});
