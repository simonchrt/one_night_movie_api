const Mongoose = require('mongoose');
const Config = require('config');

module.exports = function(){

  Mongoose.connect(Config.get('mongodb.uri'),Config.get('mongodb.options'));

  Mongoose.connection.on('connected',function(){
    console.log('Connection db ok sur ', Config.get('mongodb.uri'))
  })

}
