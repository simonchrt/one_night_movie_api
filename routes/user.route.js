const userController = require('./../controllers/user.controller.js')

module.exports = [{
        method: 'GET',
        path: '/{user}',
        handler: userController.userName
    },
    {
        method: 'POST',
        path: '/user',
        handler: userController.create

    }
]
