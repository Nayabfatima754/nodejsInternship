const isAdmin = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated() || !req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the user is an admin
    if (req.user.userType !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    // Proceed to the next middleware or route handler
    next();
};

module.exports = isAdmin;

