const jwt = require('jsonwebtoken');
const Users = require('../modules/usersModel.js');


const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken ||
        req.headers['x-access-token'] ||
        req.headers['authorization']
        if (token === null) return res.status(403).json({ msg: 'unauthorized' });
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
        if (err) return res.status(403).json({ msg: 'not verified token' });

        try {
            const user = Users.findAll({
                where: {
                    email: decode.userEmail
                }
            })
            console.log('verify token------>', decode.userEmail,'<------');
          
            await next(); // go to next stage of our middleware
        } catch (e) {
            console.log(e)
            return res.status(403).json({ msg: 'email not verified' })
        }


    })
}
module.exports = {
    verifyToken
};