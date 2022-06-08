const taskdb = require('../connections/heroku_pg.js');

const getAllTasks = (userId = 1) => {
    console.log(userId);
    return taskdb('tasks')
        .select('task_id', 'task_name', 'complete')
        .where({ user_id: userId })
        .returning('*')
};

const getTaskById = (userid,id) => {
    console.log(id);
    // console.log('db : ',db);
    return taskdb('tasks')
        .select('task_name','task_id','complete' , 'user_id')
        .where({ task_id: id })
        .andWhere({ user_id: userid })
};

const insertTask = (userId ,  task ) => {
    console.log('database add task:', task);
    return taskdb('tasks')
        .insert({ task_name: task ,user_id:userId})
        .returning('*')
};

const delTask = (userid,id) => {
    console.log('id -- db', id);
    return taskdb('tasks')
        .where({ task_id: id })
        .andWhere({ user_id: userid })
        .del()
        .returning('*')
};

const updateTask = (userid,id, { task }) => {
    return taskdb('tasks')
        .update({ task_name: task })
        .where({ task_id: id })
        .andWhere({ user_id: userid })
    // .returning('*')
};
const updateTaskcomplete = (userid,id, { complete }) => {
    return taskdb('tasks')
        .update({ complete: complete })
        .where({ task_id: id })
        .andWhere({ user_id: userid })
        .returning('*')
};



module.exports = {
    getAllTasks,
    getTaskById,
    insertTask,
    delTask,
    updateTask,
    updateTaskcomplete,
}