const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try{
        const rawToken = req.headers.authorization.split(" ")[1];
        const decToken = jwt.verify(rawToken, 'secret'); //secret is the key of the token
        next();
    } catch(err) {
        // console.log(err);
        return res.status(401).json({ message: "Not Authorized" });    
    }
    
}