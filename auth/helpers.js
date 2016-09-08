var queries = require('../queries/apiQueries');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var knex= require('../db/knex');
var express = require('express');
module.exports={
     createUser : function(body){
        //take the password from the body of the request, hashing it
        //then setting the req.body.password to the hashed password
        var hash = bcrypt.hashSync(body.password, 8);
        body.password = hash;
        //adds the user to the database with the hashed password
        return queries.addUser(body)
        .then(function(user){
        return user.id;
        });
    },
    authMiddleWare : function(req, res, next){
    //Authorization is part of the header that is being sent

    var token = req.get('Authorization');
    if(token){
      //removing "Bearer " frome the token string, leaving only the token
      token = token.substring(7);
      //a method of JWT that verifies the payload, token, and takes a callback
      jwt.verify(token, process.env.TOKEN_SECRET, function(error, decoded){
        if(error){
          next();
        }else{
          req.user = decoded;
          next();
        }
      });
    }else{
      next();
    }
  },
  ensureauthenticated : function(req, res, next){
    if(req.user){
      next();
    }else{
      res.json({
        message : "you cant come here buddy"
      });
    }
  },
findUserByEmail : function(email){
  return knex('users').where({"email": email}).first();
},
addUser : function(body){
  return knex('users').insert(body);
}

};
