var environment = process.env.DATABASE_URL || 'development';
var config = require('../knexfile')[environment];
var knex = require('knex')(config);
module.exports= knex;
