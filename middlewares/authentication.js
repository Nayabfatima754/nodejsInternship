// middleware/auth.js
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware or route handler
    }
    return res.status(401).json({ message: 'Unauthorized' }); // User is not authenticated
};


module.exports = isAuthenticated;
