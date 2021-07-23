const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const crypto = require('../utils/cryptoFuncs');

passport.use('user-jwt', new JWTStrategy({
    secretOrKey:  crypto.getSecretKey(),
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        return done(null, token);
    } catch (e) {
        return done(e, null);
    }
}));

passport.use('apikey-jwt', new JWTStrategy({
    secretOrKey:  crypto.getPubKey(),
    jwtFromRequest: ExtractJWT.fromHeader('apikey-token'),
    algorithms: ["RS256","HS256", "HS384"] 
}, async (token, done) => {
    try {
        return done(null, token);
    } catch (e) {
        return done(e, null);
    }
}));
