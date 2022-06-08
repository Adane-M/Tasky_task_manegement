const {
    getAllTasks,
    getTaskById,
    insertTask,
    delTask,
    updateTask,
    updateTaskcomplete
} = require('../modules/database.js')

const _getAllTasks =(req , res)=>{
  console.log('tasks by user :',req.params);
  const {userid} = req.params
    getAllTasks(userid)
    .then(data => {
        res.json(data);
        console.log('all tasks by user', data);
      })
      .catch(err => {
        console.log(err);
        res.json({ msg: err.message })
      })  
};

const _getTaskById =(req , res)=>{
    // console.log('by id',req.params);
    const {userid , id}= req.params
    console.log('by id',userid,id);
    getTaskById(userid,id)
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.json({ msg: err.message })
      })  
};

const _insertTask =(req, res)=>{
  console.log(`---newtaskinsert----${req.body.user_id}----`);
    insertTask(req.body.user_id , req.body.task)
    .then(data => {
      res.json(data);
      console.log('new task insert: ', data);
    })
    .catch(err => {
      res.json({ msg: err.message });
    })
};

const _delTask=(req , res)=>{
    console.log('req params del: ', req.params);
    delTask(req.params.id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ msg: err.message });
      })  
};
const _updateTask =(req, res)=>{
    console.log('task update', req.body, req.params);
    const {userid , id}= req.params

    updateTask(userid , id, req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ msg: err.message });
      })  
};

const _updateTaskcomplete =(req , res)=>{
    console.log('task update stat', req.params.id, req.body);
    updateTaskcomplete(req.params.id, req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ msg: err.message });
      })
};

module.exports = {
    _getAllTasks,
    _getTaskById,
    _insertTask,
    _delTask,
    _updateTask,
    _updateTaskcomplete
}