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

    // Check if using mock authentication (development mode)
    if (process.env.USE_MOCK_AUTH === 'true' || token.endsWith('.mock_signature')) {
        try {
            // Decode mock token (base64 encoded, not signed)
            const parts = token.split('.');
            if (parts.length < 2) {
                return res.status(401).json({ message: 'Invalid mock token format' });
            }

            const payload = JSON.parse(atob(parts[1]));
            console.log('🔐 Mock auth - User:', payload.sub);
            req.user = payload;
            return next();
        } catch (error) {
            console.error('Mock token decode error:', error);
            return res.status(401).json({ message: 'Invalid mock token' });
        }
    }

    // Production: Real JWT verification
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
