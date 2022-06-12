import React, { useState, useEffect, useContext, useCallback } from 'react'
import { AppContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Loading from './Loading';
import './Tasky.css'
import Graph from './Graph.js';
// import { Slide, toast } from 'react-toastify';



const Tasky = (props) => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [exp, setExp] = useState();
    // const [graph, setGraph] = useState(0)

    const { accessToken } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        const userConnected = async () => {
            try {
                const decode = await jwt_decode(accessToken);
                setUserId(decode.userId);
                // console.log('decode===>' , decode);
                const expire = decode.exp
                setExp(new Date(expire * 1000).toString())
                if (expire * 10000 < new Date().getTime()) {
                    navigate('/login')
                    console.log(expire);
                }
            } catch (error) {
                console.log(error);
            }
        }
        userConnected();
    })
    const getUserTasks = useCallback(async () => {
        setIsLoading(true);
        const res = await axios.get(`/tasks/all/${userId}`)
        console.log(res.data);
        const sortedArr = res.data.sort((a, b) => b.task_id - a.task_id)
        setIsLoading(false);
        setTasks(sortedArr);
    }, [userId]);



    useEffect(() => {
        getUserTasks()
            .catch(e => {
                console.log(e);
                setIsLoading(false);
            })

    }, [getUserTasks])

    const addtask = async (e) => {
        setTask(e.target.value);
        if (e.key === 'Enter') {
            if (!e.target.value) return;
            try {
                let res = await axios.post('/tasks/add', {
                    task, user_id: userId
                }, {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                })
                console.log(' task sent->', res.data);
                e.target.value = null;
                getUserTasks();
            } catch (e) {
                console.log(e);
            }
        }

    };

    const delTask = async (id) => {
        try {
            let res = await axios.delete(`/tasks/${userId}/${id}`)
            console.log(' task deleted->', res.data);
            getUserTasks();
        } catch (e) {
            console.log(e);
        }
    }




    const updateTaskComplete = async (id, complete) => {
        const comp = !complete ? true : false;

        try {
            let res = await axios.put(`http://localhost:5000/tasks/task/${userId}/${id}`, {
                complete: comp
            })
            // console.log(' task updated stat->', res); 
            getUserTasks();
        } catch (e) {
            console.log(e);
        }
    };



    return (
        <div>
            <div className='wrap'>
                <h1 className="mb-3"> wellome to your task manager</h1>
                <p style={{ display: 'none' }} >{exp}</p>
                <input className='col-8' type='text' onKeyUp={(e) => addtask(e)} placeholder="Add task" />

                <div className='container' >
                    <div className='board'>
                        {isLoading ? <Loading /> :
                            tasks.map(item => {

                                return (
                                    <div className='row' key={item.task_id}>
                                        <div className='col-7'>

                                            <div className={!item.complete ? null : 'complete'} onClick={() => updateTaskComplete(item.task_id, item.complete)}> {item.task_name} </div>
                                        </div>
                                        <div className='col-2'>
                                            <Link className="btn linkTo" to={`/update/${userId}/${item.task_id}`} > update </Link>
                                        </div>

                                        <div className='col-3'>
                                            <button className="delete" onClick={() => delTask(item.task_id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <hr />
                                    </div>
                                )

                            })

                        }
                    </div>
                    <Graph tasks={tasks} />
                </div>

            </div>
        </div>
    )
}

export default Tasky;