var passport = require('passport');
var GitHubStrategy = require('passport-github');
var mongoose = require('mongoose');

module.exports = function () {

    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: '2abb4a486b5451044ca1',
        clientSecret: '9a2731f46a701d338f6c204cbdf6f407eba533a3',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    }, function (accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate(
            {"login" : profile.username},
            {"nome" : profile.username},
            function (erro, usuario) {
                if (erro) {
                    console.log(erro);
                    return done(erro);
                }
                return done(null, usuario);
            }
        );
    }));

    passport.serializeUser(function (usuario, done) {
        done(null, usuario._id);
    });

    passport.deserializeUser(function (id, done) {
        Usuario.findById(id).exec()
            .then(function (usuario) {
                done(null, usuario);
            });
    });
};