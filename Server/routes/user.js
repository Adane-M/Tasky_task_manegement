const express = require('express');
const router = express.Router();

const {
_insertUser,
_logUser,
_insertUserQuery,
_displayuser
} = require('../controlers/user.js');

// router.post('/signup' , _insertUser);
router.get('/login' , _logUser);
router.get('/signup' , _insertUserQuery);
router.post('/sign' , _insertUser);
router.get('/all' , _displayuser);
module.exports = router;