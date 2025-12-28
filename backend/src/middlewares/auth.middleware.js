const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const authConfig = require('../config/auth');

const client = jwksClient({
    jwksUri: `${authConfig.issuer}/discovery/v2.0/keys`,
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        getKey,
        {
            audience: authConfig.audience,
            issuer: authConfig.issuer,
            algorithms: ['RS256'],
        },
        (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            req.user = decoded;
            next();
        }
    );
};
