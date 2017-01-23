'use strict';

const Hapi = require('hapi');
const Config = require('config');
const Mongoose = require('mongoose');
const mainRoute = require('./routes/main.route.js');
const userRoute = require('./routes/user.route.js');
const movieRoute = require('./routes/movie.route.js');
const connectionDb = require ('./utils/connectiondb.js');
const userModel = require ('./models/user.model.js');

connectionDb();
const userSchema = new Mongoose.Schema(userModel.schema);
userSchema.pre('save',userModel.preSave);
Mongoose.model('user',userSchema);

const server = new Hapi.Server();
server.connection(Config.get('server.connection'));

server.route(mainRoute);
server.route(userRoute);
server.route(movieRoute);

server.start((err) => {
    console.log(server.info.uri)
});
