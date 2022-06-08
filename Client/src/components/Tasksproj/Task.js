import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Task = (props) => {
    const [task, setTask] = useState('')
    const[userid , setUserid] = useState('')
    const[taskid , setTaskid] = useState('')
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getTask = async () => {
            try {
                console.log(params.id);
                // let num = isNaN(params.id) ? 1 : params.id;
                // console.log(num);
                const res = await fetch(`/task/2/${params.id}`)
                const data = await res.json();
                console.log(data);
                setTask(data[0]);
                setTaskid(data[0].task_id)
                setUserid(data[0].user_id)
            }
            catch (err) {
                console.log('error task :', err);
            }
        }
        getTask();
    }, [params.id])


    const updateTask = (userid,taskid) => {
        console.log('ids',userid,taskid);
        console.log('task',task);
        // let updatedTask ={
        //     task: task
        // }
        fetch(`http://localhost:5000/task/${userid}/${taskid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        })
            .then(res => res.json())
            .then(data => {
                // setTask(data)
                console.log(data);

            })
            .catch(err => {
                console.log(err);
            })
    }

    const delTask = (userid ,taskid) => {
        fetch(`task/${userid}/${taskid}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                navigate('/')
            })
            .catch(err => console.log('error :', err))
        navigate('/login');
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
                                <h2>Update task</h2>
                                {/* <form onSubmit={updateTask} > */}
                                    Task:<input type='text' onChange={(e) => setTask(e.currentTarget.value)} value={task.task_name} /><br />
                                    {/* <input type='submit' value='Update' /> */}
                                {/* </form> */}
                                <button onClick={()=>updateTask(userid,taskid)}>Update</button>
                                <button onClick={()=>delTask(userid,taskid)}>delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Task;