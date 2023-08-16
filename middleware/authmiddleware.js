const jwt = require('jsonwebtoken');
const config = require('../utilis/config');
const SECRET = config.SECRET_CODE;

const authmiddleware = {
    verifyToken: (request, response, next) => {
        const token = request.headers.authorization;
        console.log(token);
        if (!token) {
            return response.json({ error: "authentication error token doesnot exists" });
        }
        try {
            const chktoken = jwt.verify(token, SECRET);
            request.userId = chktoken.userId;
            next();
        } catch (error) {
            console.log('authentication error', error);
            response.json({ error: "authentication error" })
        }
    }
}
module.exports = authmiddleware;