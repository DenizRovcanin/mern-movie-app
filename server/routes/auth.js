const jwt = require('jsonwebtoken');

const isAuthenticated = function(req) {
    return jwt.verify(req.headers.authorization.split(' ')[1], 'secret', function (err, decoded) {
        if (err) {
            return null;
        }

        return decoded;
    });
};

module.exports = isAuthenticated;
