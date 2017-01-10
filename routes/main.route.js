const mainController = require('./../controllers/main.controller.js')


module.exports = [
    {
        method: '*',
        path: '/{p*}',
        handler: mainController.notFound
    }

]
