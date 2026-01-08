// Development mock auth middleware 
// This bypasses Azure B2C during development

module.exports = function (req, res, next) {
    // Extract mock token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    const token = authHeader.split(' ')[1];

    // For mock tokens, extract user ID from payload
    try {
        const parts = token.split('.');
        if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            req.user = {
                sub: payload.sub || 'mock-user-id'
            };
            next();
        } else {
            throw new Error('Invalid token format');
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
