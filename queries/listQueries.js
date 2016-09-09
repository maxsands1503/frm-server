var knex = require('../db/knex');
function Lists(){
  return knex('lists');
}

module.exports = {
  create: function(input){
    return Lists().insert({name: input.name,
                          user_id: input.user_id,
                          list_type: input.list_type});
  },
  all: function(id){
    return Lists().where('user_id',id);
  },
  find: function(id){
    return Lists().where('id',id);
  },
  findLatest: function(user_id){
    return Lists().where('user_id',user_id).orderBy('id','desc').first();
  },
  update: function(input){
    return Lists().where('id',input.id)
                  .update({
                    name:input.name,
                    user_id:input.user_id,
                    list_type:input.list_type
                  });
  },
  delete: function(id){
    return Lists().where('id',id).del();
  },
  addUser: function(id, input){
    return knex('connections').where('connection_id', id).first().then(function(connect){
      return knex('list_users').insert({
        list_id: input.list,
        user_id: connect.connection_id,
        conn_id: connect.id,
        user_permission: input.permission
      })
    })
  }

}
