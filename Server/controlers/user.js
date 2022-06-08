const {
  insertUser,
  logUser,
  insertUserQuery,
  displayuser
} = require('../modules/user.js');

const _displayuser = (req , res) =>{
  displayuser()
  .then(data => {
    res.json(data);
    console.log('all users server', data);
  })
  .catch(err => {
    console.log(err);
    res.json({ msg: err.message })
  })
  // res.send({msg:'ok'})
}
const _insertUser = (req, res) => {
  console.log('new user ', req.body);
  insertUser(req.body)
    .then(data => {
      res.json(data); 
      console.log('new user added: ', data);
    })
    .catch(err => {
      res.json({ msg: err.message });
    })
};
const _insertUserQuery = (req, res) => {
  console.log('new user query ', req.body);
  insertUserQuery(req.body)
    .then(data => {
      res.json(data);
      console.log('new user qury: ', data);
    })
    .catch(err => {
      res.json({ msg: err.message });
    })
};

const _logUser = (req, res) => {
  logUser(req.body)
    .then(data => {
      res.json(data);
      console.log('new user: ', data);
    })
    .catch(err => {
      res.json({ msg: err.message });
    })
};
module.exports = {
  _insertUser,
  _logUser,
  _insertUserQuery,
  _displayuser
}
