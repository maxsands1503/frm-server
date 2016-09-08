var knex = require('../db/knex');
function Lists(){
  return knex('lists');
}
function ListItems(){
  return knex('list_items');
}

module.exports = {
  create: function(input){
    return ListItems().insert({list_id: input.list_id,
                                item_name: input.item_name,
                                reminder_date: input.reminder_date,
                                do_notify: input.do_notify,
                                notify_int: input.notify_int
                              });
  },
  all: function(id){
    return ListItems().where('list_id',id);
  },
  find: function(id){
    return ListItems().where('id',id);
  },
  update: function(input){
    return ListItems().where('id',input.id)
                      .update({
                        list_id: input.list_id,
                        item_name: input.item_name,
                        reminder_date: input.reminder_date,
                        do_notify: input.do_notify,
                        notify_int: input.notify_int
                      });
  },
  deleteOne: function(id){
    return ListItems().where('id',id).del();
  },
  deleteAll: function(list_id){
    return ListItems().where('list_id',list_id).del();
  }
}
