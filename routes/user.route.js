const userController = require('./../controllers/user.controller.js');
const Joi = require('joi');

module.exports = [{
        method: 'POST',
        path: '/user',
        config: {
            validate: {
                options:{
                    allowUnknown: false
                },
                payload: {
                    pseudo: Joi.string().min(5),
                    password: Joi.string().min(7)
                }
            }
        },
        handler: userController.create
    },
    {
        method: 'GET',
        path: '/user/{pseudo}',
        config: {
            validate: {
                options:{
                    allowUnknown: false
                },
                params: {
                    pseudo: Joi.string().min(5),
                    password: Joi.string().min(7)
                }
            }
        },
        handler: userController.find
    },
    {
        method: 'DELETE',
        path: '/user/{id}',
        config: {
            validate: {
                options:{
                    allowUnknown: false
                },
                params: {
                    id : Joi.string().regex(/^[0-9a-fA-F]{24}$/)
                }
            }
        },
        handler: userController.delete
    },

    {
        method: 'PUT',
        path: '/user/update',
        config: {
            validate: {
                options:{
                    allowUnknown: false
                },
                payload: {
                    id : Joi.string().regex(/^[0-9a-fA-F]{24}$/)
                }
            }
        },
        handler: userController.update

    }


]
