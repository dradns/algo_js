var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
        clientID: 'cf6cbde24074605c73ae',
        clientSecret: '060c7f065f3769fd80309a0fae118b80ed50953c',
        callbackURL: "http://localhost:3002/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return done(null, profile);
        // });
    }
));