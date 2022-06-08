const Sequelize = require('sequelize');
const db = require('../connections/db.js');
//activate the sequelize to match to my datatypes in my database;
const { DataTypes } = Sequelize;
//name of columns in my database
const Users = db.define('users', {
    fname: {
        type: DataTypes.STRING
    },
    lname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    passw: {
        type: DataTypes.STRING
    },
    createdAt: {
        field: 'createdat',
        type: DataTypes.DATE
    },
    updatedAt: {
        field: 'updatedat',
        type: DataTypes.DATE
    }
},
    {
        freezeTableName: true
    },

);
// {
//     freezeTableName: true
// }
//we can also assign date timestamps like this!
// createdAt: {
//     field: 'createdat', //this is the way the column is named in the database if it doesn't match with out field name in js (due to the camelcase)
//     type: DataTypes.DATE
// },
// updatedAt: {
//     field: 'updatedat',
//     type: DataTypes.DATE
// }
module.exports = Users;