import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Task = (props) => {
    const [task, setTask] = useState('')
    const params = useParams();
    const navigate = useNavigate();
    const { userid, taskid } = params

    useEffect(() => {
        const getTask = async () => {
            try {
                const res = await axios.get(`/tasks/${userid}/${taskid}`)
                console.log(res.data);
                setTask(res.data[0].task_name);
            }
            catch (err) {
                console.log('error task :', err);
            }
        }

        getTask();
    }, [userid , taskid])


    const updateTask = async () => {
        const val = document.getElementById('inpval').value;
        setTask(val)
        try {
            let res = await axios.put(`/tasks/update/${userid}/${taskid}`, {
                task
            })
            console.log(' update TASK->', res);
            navigate('/')
        } catch (e) {
            console.log(e);
        }
    }

    const delTask = () => {
        fetch(`/tasks/${userid}/${taskid}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                navigate('/')
            })
            .catch(err => console.log('error :', err))
    }

    return (
        <header style={{
            backgroundImage: `url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')`,
            height: '100vh', margin: '0px', padding: '0px'
        }}>
            <div className="p-5 text-center bg-image" >
                <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white">
                            <div>
                                <h2>Update task {task}</h2>
                                {/* <form onSubmit={updateTask} > */}
                                Task:<input type='text' id='inpval' onChange={(e) => setTask(e.target.value)} value={task} /><br />
                                {/* <input type='submit' value='Update' /> */}
                                {/* </form> */}
                                <button onClick={updateTask}>Update</button>
                                <button onClick={delTask}>delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Task;