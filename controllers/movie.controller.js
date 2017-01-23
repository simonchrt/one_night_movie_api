const Mongoose = require('mongoose');
const Request = require('request');
const Config = require('config');
const movieService = require('./../services/movie.service');
const async = require('async');
const _ = require('lodash');

module.exports = {

    searchMovie: function(request, reply) {
        const key = Config.get("api_key_tmd")
        Request('https://api.themoviedb.org/3/movie/' + request.params.idtmd + '?api_key=' + key + '&language=fr-FR&append_to_response=credits', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                reply(body).type('application/json')
                var result = JSON.parse(body);
                var test = movieService.formatMovie(result.id, result.original_title, result.release_date, result.genres);
                console.log(test) // Show the HTML for the Google homepage.
            }
        })

    },

    listGenre: function(request, reply) {
        const key = Config.get("api_key_tmd")
        Request('https://api.themoviedb.org/3/genre/movie/list?api_key=' + key + '&language=en-US', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                reply(body).type('application/json')
                console.log(typeof body) // Show the HTML for the Google homepage.
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
        /*const test = [];
                var i = 0;
                test.push({
                    id: 3,
                    title: "Denis la malice"
                });

                if (_.filter(movies, function(o) {
                        return o.id = 3;
                    }).length == 0) {
                    console.log("ok")
                } else {
                    console.log("fail")
                    console.log(_.filter(movies, function(o) {
                        return o.id = 3;
                    }))

                }
            }
            */


        async.whilst(
            function() {
                return movies.length < 10;
            },
            function(callback) {

              while (test = true) {
                var random = Math.floor((Math.random() * (550 - 541 + 1)) + 541);

                if (true) {

                }
              }

                Request('https://api.themoviedb.org/3/movie/' + random + '?api_key=' + key, function(error, response, body) {

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
                        console.log("success");
                        movies.push(result);
                        callback(null);
                    } else {
                        console.log("Error : movie already exist ");
                        callback(null);

                    }
                })
            },
            function(err, n) {
                console.log(err)
                reply(movies)
            }
        );
    }
    /*
        getMultipleMovie: function(request, reply) {
            console.log("start function")
            const key = Config.get("api_key_tmd");
            async.times(10, function(n, next) {
                var random = Math.floor((Math.random() * (550 - 500 + 1)) + 500);
                console.log("before request")
                Request('https://api.themoviedb.org/3/movie/' + random + '?api_key=' + key, function(error, response, body) {
                    console.log("after request")
                    if (!error && response.statusCode == 200) {
                        console.log("result found")
                        var result = JSON.parse(body);
                        next(null, result);
                    } else {
                        next(null)
                        console.log("error", error)
                    }
                })
            }, function(err, movies) {
                console.log("end")
                reply(movies)
            });
        }
        */
}
