var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
    domain:       'mattmerr47.auth0.com',
    clientID:     'tMhGths7WYZtiOsXL4C6zi2vOfluNMYO',
    clientSecret: 'M-z_G4eHZKaxHTEpQmRQd53a-d-dQSN7KG5GI5xFlyIlOUWSCjdQHp28FsyZKl_X',
    callbackURL:  'http://localhost:3000/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
});

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = strategy;
