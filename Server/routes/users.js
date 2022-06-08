const { getUsers, register, login, logout } = require('../controlers/users.js');
const {verifyToken} = require('../middleware/verifyToken.js')
const express = require('express');

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/token', verifyToken, (req, res) => {
    const accessToken = req.cookies.accessToken ||
        req.headers['x-access-token'] ||
        req.headers['authorization']
    res.status(200).json({ accessToken });
});

//using "type":"module" in package.json=>no need for export.modules
// export default router; 
module.exports = router;
