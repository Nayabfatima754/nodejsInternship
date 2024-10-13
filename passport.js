
const passport = require('passport');              // Import Passport for authentication
const LocalStrategy = require('passport-local').Strategy;  // Import Passport's Local Strategy
const bcrypt = require('bcrypt');                  // Import bcrypt for password hashing
const User = require('./models/userModel');             // Import your Mongoose User model (update the path as needed)

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // Find the user by username
        const user = await User.findOne({ username: username });
        
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatched = await bcrypt.compare(password, user.password);
        
        if (!isMatched) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        // If password matches, return the user
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));


// Serialize user (to store user in the session)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user (retrieve user from session)
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
module.exports=passport;
