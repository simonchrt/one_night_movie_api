const Mongoose = require('mongoose');
const Request = require('request');
const Config = require('config');
const async = require('async');
const _ = require('lodash');

module.exports = {

    searchMovie: function(request, reply) {
        const key = Config.get("api_key_tmd")
        Request('https://api.themoviedb.org/3/movie/' + request.params.idtmd + '?api_key=' + key + '&language=fr-FR&append_to_response=credits', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                console.log(result)
                reply(result).type('application/json')
            }
        })

    },

    searchMovieByGenres: function(request, reply) {
        const key = Config.get("api_key_tmd")
        Request('https://api.themoviedb.org/3/genre/' + request.params.idgenres + '/movies?api_key=' + key + '&language=en-US&include_adult=false&sort_by=created_at.asc', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                var format = movieService.formatMovie(result.id, result.original_title, result.release_date, result.genres);
                console.log(format) // Show the HTML for the Google homepage.
                reply(format).type('application/json')
            }
        })

    },


    listGenre: function(request, reply) {
        const key = Config.get("api_key_tmd")
        Request('https://api.themoviedb.org/3/genre/movie/list?api_key=' + key + '&language=en-US', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                reply(result["genres"]).type('application/json')
                console.log(result["genres"]) // Show the HTML for the Google homepage.
            }
        })
    },

    randomMovie: function(request, reply) {
        const key = Config.get("api_key_tmd");
        const random = Math.floor((Math.random() * (550 - 500 + 1)) + 500);
        Request('https://api.themoviedb.org/3/movie/' + random + '?api_key=' + key, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                reply(body).type('application/json')
                console.log(body) // Show the HTML for the Google homepage.
            }
        })
    },


    tenRandomMovie: function(request, reply) {
        const key = Config.get("api_key_tmd");
        const movies = [];

        async.whilst(
            function() {
                return movies.length < 10;
            },
            function(callback) {

                var random = Math.floor((Math.random() * (1000 - 100 + 1)) + 100);

                Request('https://api.themoviedb.org/3/movie/' + random + '?api_key=' + key + '&append_to_response=credits', function(error, response, body) {

                    if (error) {
                        return callback('error in the request:' + error);
                    }
                    var result = JSON.parse(body);
                    var existMovie = _.filter(movies, function(elm) {
                        if (elm.id === result.id) {
                            return true;
                        }

                    })
                    if (!error && response.statusCode == 200 && existMovie.length === 0) {
                        var realisateurs = _.filter(result.credits.crew, {
                            'job': 'Director'
                        });
                        var acteurs = result.credits.cast
                        format = _.pick(result, ['id', 'original_title', 'overview', 'poster_path', 'backdrop_path', 'genres', 'runtime', 'release_date']);
                        _.merge(format, {
                            realisateurs: realisateurs
                        })
                        _.merge(format, {
                            acteurs: acteurs
                        })
                        callback(null);

                        movies.push(format);

                    } else {
                        console.log("Error : movie already exist");
                        callback(null);

                    }
                })
            },
            function(err, test) {
                console.log(err)
                return reply(movies)
            }
        );
    }

}
