var knex = require('../db/knex');

function Lists(){
  return knex('lists');
}

function ListUsers(){
  return knex('list_users');
}

module.exports = {
  create: function(input){
    return ListUsers().insert({
      list_id: input.list_id,
      user_id: input.user_id,
      user_permission: input.user_permission,
      conn_id: input.conn_id
    });
  },
  delete: function(list_id){
    return ListUsers().where('list_id',list_id).del();
  }
}
