const movieController = require('./../controllers/movie.controller.js');
const Joi = require('joi');

module.exports = [{
        method: 'GET',
        path: '/movie/{idtmd}',
        config: {
            validate: {
                options:{
                    allowUnknown: false
                },
                params: {
                    idtmd: Joi.string().regex(/[0-9]+/)
                }
            }
        },
        handler: movieController.searchMovie
    },



]
