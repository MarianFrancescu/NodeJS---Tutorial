const jwt = require('jsonwebtoken');

function authUser(req, res, next) {
    try{
        const rawToken = req.headers.authorization.split(" ")[1];
        const decToken = jwt.verify(rawToken, 'secret'); //secret is the key of the token
        next();
    } catch(err) {
        return res.status(401).json({ message: "Not Authorized" });    
    }
}

function authRole(role) {
    return (req, res, next) => {
        console.log(req.headers.role)
      if (req.headers.role !== role) {
        res.status(401)
        return res.send('Not allowed')
      }
  
      next()
    }
  }

module.exports = {
    authUser,
    authRole
}