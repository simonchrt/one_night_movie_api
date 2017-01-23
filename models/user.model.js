const Bcrypt = require('bcrypt');
const Config = require('config');

module.exports = {
    schema: {
        pseudo: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        }
    },

    preSave: function(next) {
        console.log(this);
        Bcrypt.genSalt(Config.get('server.auth.saltFactor'), (err, salt) => {
            if (err) {
                return next(err);
            }
            Bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }
                this.password = hash;
                next();
            });
        });
    }

}
