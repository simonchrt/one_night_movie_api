const Mongoose = require('mongoose');
const Request = require('request');
const Config = require('config');

module.exports = {

    searchMovie: function(request, reply) {
        const key = Config.get("api_key_tmd")
        Request('https://api.themoviedb.org/3/movie/'+request.params.idtmd+'?api_key='+key, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                reply(body).type('application/json')
                console.log(body) // Show the HTML for the Google homepage.
            }
        })

    }


}
