const db = require('../connections/heroku_pg.js');
// const {sequelize} = require('sequelize');
// const DataTypes = sequelize();
// const Users = db.define('users',{
//     fname:{
//         type:DataTypes.STRING
//     },
//     lname:{
//         type:DataTypes.STRING
//     },
//     email:{
//         type:DataTypes.STRING
//     },
//     password:{
//         type:DataTypes.STRING
//     },
//     createdAt:{
//         field:'createdat',
//         type: DataTypes.DATE
//     },
//     updateAt:{
//         field:'updatedat',
//         type: DataTypes.DATE
//     }

// })
const { Client } = require('pg');
const pg = new Client({
    port: process.env.PORT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
});
pg.connect();
const insertUserQuery = ( user ) => {
    
    // pg.query(`select * from users `, (err, res) => {
    // pg.query(`UPDATE purchases SET items_purchased = items_purchased || 
    // '{"name": "ADANE LG Ultrawide Monitor",
    //         "price": 190,
    //         "productid": 15}' ::jsonb
    // WHERE id=1;
    // `, (err, res) => {
        console.log('user query : ' , user);
    const { fname, lname, email, passw } = user;
    pg.query(`INSERT INTO users(fname, lname , email , passw) VALUES (${fname, lname, email, passw})`, (err, res) => {
        if (err) {
            console.log('error', err.message);
        }
        console.log('DONE!!!', res.rows);

        pg.end();


    })
};


const insertUser = ({ user }) => {
    console.log('database add user:', user);

    return db('users')
        .insert({ fname: user.fname , lname: user.lname , email: user.email , passw: user.password })
        .returning('*')
};
const logUser = ({ user }) => {
    console.log(user);
    return db('users') 
        .select('passw')
        .whereIlike({ email: user.usermail })
        .then(rows => console.log(rows))

}
const displayuser = ()=>{
    return db('users')
    .select('id' , 'fname' , 'lname', 'email', 'passw')
    .returning('*')
}

module.exports = {
    insertUser,
    logUser,
    insertUserQuery,
    displayuser
}
