const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next){
    const tokenString= req.headers.authorization;
    if (!tokenString){
        res.status(401).json({ success: false, message: "Usuario no autorizado"})
    } else {
        try {
            const token = tokenString.split(" ")[1];
            const decoded  = jwt.verify (token, process.env.JWT_SECRET);
            req.dataUser = decoded;
            next(); 
        } catch (error) {
           res.status(400).json ({success: false, message: error});
        }
        
    }
      

    

}
module.exports = authenticateToken;