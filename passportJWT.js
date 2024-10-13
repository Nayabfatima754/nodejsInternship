require('dotenv').config();
const passport = require('passport');
const User = require('./models/userModel');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

// Define a function to set up the JWT strategy
const configureJwtStrategy = () => {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWTSECRETKEY;
    // Define the JWT strategy
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            // Use await instead of a callback
            const user = await User.findOne({ _id: jwt_payload.id });
            if (user) {
                return done(null, user);
            } else {
                return done(null, false); // User not found
            }
        } catch (err) {
            return done(err, false); // Handle error
        }
    }));
};

// Export the function so you can call it from another file
module.exports = configureJwtStrategy;
