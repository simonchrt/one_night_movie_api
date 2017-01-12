const Mongoose = require('mongoose');
module.exports = {

        find: function(request, reply) {

            const User = Mongoose.model('user')

            User.find({

                pseudo: request.params.pseudo
            }).exec(function(err, user) {
                if (err) {
                    return reply(err);
                }
                if (!request.params.pseudo) {
                    return reply('Utilisateur introuvable');
                }
                console.log(user.id)
                return reply(user)

            });
        },

        create: function(request, reply) {

            const User = Mongoose.model('user')

            const user = new User({
                pseudo: request.payload.pseudo,
                password: request.payload.password
            })

            user.save(function() {

                reply('Ok')
            });
        },

        delete: function(request, reply) {

            const User = Mongoose.model('user')

            User.remove({

                _id: request.params.id
            }).exec(function(err) {
                if (err) {
                    return reply(err)
                } else {
                    reply('ok')
                }
            })


        },

        update: function(request, reply) {

            const User = Mongoose.model('user')

            User.update({id: request.payload.id}, {
                pseudo: request.payload.pseudo

            }, function(err) {
              if (err) {
                  return reply(err)
              } else {
                  reply('ok')
              }
            })



        }
}
