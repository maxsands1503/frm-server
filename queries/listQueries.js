var knex = require('../db/knex');
function Lists(){
  return knex('lists');
}

module.exports = {
  create: function(input){
    return Lists().insert({name: input.name,
                          user_id: input.id,
                          list_type: input.list_type});
  },

  all: function(id){
    return Lists().where('user_id',id);
  },
  find: function(id){
    return Lists().where('id',id);
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
}
