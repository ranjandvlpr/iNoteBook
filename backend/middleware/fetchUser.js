var jwt = require("jsonwebtoken");
const fetchUser = (req, res, next) => {
    //get the user from jet token and add id to re object
    const token = req.header('auth-token');
    const JWT_SECRET = "RANJAN IS GOOD BOY";
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchUser;