const jwt = require('jsonwebtoken');
const {
  getAllTasks,
  getTaskById,
  insertTask,
  delTask,
  updateTask,
  updateTaskcomplete
} = require('../modules/database.js')

const _getAllTasks = async (req, res) => {
  // const token = req.cookies.accessToken;
  // console.log('req.headers==TOKEN==>>>', token, req.headers, '<<=====');
  const { userid } = req.params
  try {
    const alltasks = await getAllTasks(userid)
    console.table('=====>', alltasks, '<====');
    res.json(alltasks)
  } catch (error) {
    res.status(404).json({ msg: 'error with geeting tasks' })
  }
};

const _getTaskById = (req, res) => {
  const { userid, id } = req.params
  getTaskById(userid, id)
    .then(data => {
      console.log('get task by id---->', data);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: err.message })
    })
};

const _insertTask = async (req, res) => {
  const { user_id, task } = req.body;
  try {
    const data = await insertTask(user_id, task)
    console.log(`---newtaskinsert----${data}----`);
    res.json(data);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const _delTask = async (req, res) => {
  const { userid, taskid } = req.params;
  try {
    let deletedTask = await delTask(userid, taskid);
    console.log('task delted: ', deletedTask);
    res.json(deletedTask);
  } catch (error) {
    res.json({ msg: error.message })
    // console.log('del task ---->tasks cont' , error);
  }
};
const _updateTask = (req, res) => {
  console.log('task update', req.body, req.params);
  const { userid, id } = req.params

  updateTask(userid, id, req.body)
    .then(data => {
      res.json(data);
      console.log(data);
    })
    .catch(err => {
      res.json({ msg: err.message });
    })
};

const _updateTaskcomplete = async (req, res) => {
  const { userid, taskid } = req.params;
  const { complete } = req.body;
  try {
    let completed = await updateTaskcomplete(userid, taskid, complete);
    console.log('task update stat', completed);
    res.json(completed);
  } catch (error) {
    console.log(error);
    res.json({ msg: error.message })
  };
};

module.exports = {
  _getAllTasks,
  _getTaskById,
  _insertTask,
  _delTask,
  _updateTask,
  _updateTaskcomplete
}