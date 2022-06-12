const Users = require('../modules/usersModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
    console.log(req, res);
    try {
        const users = await Users.findAll({
            attributes: ['id', 'fname', 'lname', 'email']
        });
        res.json(users);
        console.table('get users success', users);
    } catch (e) {
        console.log('get users error*/*/*/*==', e);
        res.json({ msg: 'user not found' })
    }


}

const register = async (req, res) => {
    // console.log('---reg req--------', req.body);
    const { fname, lname, email, passw } = req.body;

    if (!(fname && lname && email && passw)) {
        return res.status(400).json({ msg: 'please insert data properly!' })
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(passw, salt);

    try {
        const newUser = await Users.create({
            fname: fname,
            lname: lname,
            email: email,
            passw: hashPassword
        })
        res.json({ msg: 'Registered Successfully' })
    } catch (e) {
        console.log('controler users------ERR--->>>>---', e);
        res.status(404).json({ msg: `Email already exists` })
    }
}

const login = async (req, res) => {
    try {
        const { email, passw } = req.body
        const user = await Users.findAll({
            where: {
                email: email
            }
        });
        const match = await bcrypt.compare(passw, user[0].dataValues.passw);
        console.log("match--controler", match);
        if (!match) {
            return res.status(400).json({ msg: 'Wrong password' });
        }
        const userId = user[0].dataValues.id;
        const userEmail = user[0].dataValues.email;
        //creat access-token when login success!
        const accessToken = jwt.sign({ userId, userEmail }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1500s'
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 60 * 1000
        });
        res.json({ accessToken });
    } catch (e) {
        res.status(400).json({ msg: 'Email not found' })
    }

}

const logout = (req, res) => {
    res.json({ msg: 'logout' })
}
module.exports = {
    getUsers,
    register,
    login,
    logout,
}