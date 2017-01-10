const Mongoose = require('mongoose');
module.exports = {

    find: function(request, reply) {

        reply(request.params.user)
        
    },

    create: function(request, reply) {

        const User = Mongoose.model('user')

        const user = new User({
            pseudo: request.payload.pseudo,
            password: request.payload.password
        })

        user.save(function() {

            reply('Ok')
        })
    }
}
