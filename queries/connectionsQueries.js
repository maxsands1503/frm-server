var knex = require('../db/knex');
module.exports ={
  createConnection: function(input, urlin){
    if(input.is_user === true){
      return knex('users').where('email', input.email).first().then(function(data){
        return knex('connections').insert({
          first_name: data.first_name,
          last_name: data.last_name,
          relation: data.relation,
          user_id: urlin.id,
          is_user: true,
          connection_id: data.id
        })
      })
    }else{
      return knex('connections').insert({
        first_name: input.first_name,
        last_name: input.last_name,
        relation: input.relation,
        user_id: urlin.id,
        is_user: false,
        connection_id: null
      })
    }
},
getOneConnection: function(input){
  return knex('connections').where('id', input.id).first().then(function(con){
    return knex('list_users').where('conn_id', con.id).then(function(listU){
      return knex('lists').whereIn('id', listU.list_id).then(function(listS){
        return {
          con: con,
          listU: listU,
          listS: listS
        }
      })
    })
  })
},
editConnection: function(input){

}
};
