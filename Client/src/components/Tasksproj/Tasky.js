import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Loading from './Loading';


const Tasky = (props) => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [exp, setExp] = useState();

    const { accessToken } = useContext(AppContext)
    const navigate = useNavigate()



    useEffect(() => {
        const decode = jwt_decode(accessToken);
        setUserId(decode.userId);
        // setUser(decode.fname);
        // setEmail(decode.email);
    console.log('jwt =====',decode);
        const expire = decode.exp
        setExp(new Date(expire * 1000).toString())
        if (expire * 5000000 < new Date().getTime()) {
            // navigate('/login')
            console.log(expire);
        }
    }, [])

    useEffect(() => {
        setIsLoading(true)
        // const getUsers = async () => {
        //     try {
        //         const res = await axios.get(`tasks/all/${userId}`)
        //         setIsLoading(false)
        //         console.log(res.data);
        //         setTasks(res.data);
        //     } catch (e) {
        //         setIsLoading(false)
        //         console.log(e);
        //     }
        // }
        // getUsers()
        axios.get(`tasks/all/${userId}`)
            .then(res => {
                console.log(res.data);
                setIsLoading(false)
                setTasks(res.data);

            })
            .catch(e => {
                console.log(e)
                setIsLoading(false)
            })
        // try {
        //     const res = axios.get(`tasks/all/${userId}`)
        //     setIsLoading(false)
        //     console.log(res.data);
        //     setTasks(res.data);
        // } catch (e) {
        //     setIsLoading(false)
        //     console.log(e);
        // }

    },[]);

    const addtask = (e) => {
        // e.preventDefault();
        console.log('add task', task, userId);
        fetch(`/tasks/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: task, user_id: userId })
        })
            .then(res => res.json())
            .then(data => {
                console.log('task sent', data);
            })
            .catch(err => {
                console.log(err);
            })
    };


    const updateTaskComplete = (e, id, complete) => {
        let liClass = e.target.classList;
        complete = !complete;
        !complete ? liClass.remove('complete') : liClass.add('complete');
        // Client\node_modules\jwt-decode\build\jwt-decode.js
        fetch(`/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ complete: complete })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data[0].complete);
                // data[0].complete === true ? liClass.add('complete') : liClass.remove('complete');
            })
            .catch(err => {
                console.log(err);
            })
    };
    const delTask = (id) => {
        fetch(`/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log('error :', err))
        // navigate('/')
    }



    return (
        <div>
            <div>
                <h3>{userId}</h3>
                <h3>{email}</h3>
                <h3>{exp}</h3>
                <h3>{user}</h3>
            </div>
            <div className='wrap' style={{ textAlign: 'center' }}>
                <h1 className="mb-3">wellome to your task manager</h1>
                {/* <h1>userId : {userId } email :{email} exp :{exp} </h1> */}
                <form onSubmit={addtask}>
                    <input className='col-8' type='text' onChange={(e) => setTask(e.target.value)} />
                    <button type='submit'>add task</button>
                </form>

                <div className='container'>
                    {isLoading ? <Loading /> :
                        tasks.map(item => {

                            return (
                                <div className='row' key={item.task_id}>
                                    <div className='col-7'>
                                        <div onClick={(e) => updateTaskComplete(e, item.task_id, item.complete)}> {item.task_name} </div>
                                    </div>
                                    <div className='col-2'>
                                        <Link className="btn linkTo" to={`/${userId}/${item.task_id}`} > update </Link>
                                    </div>
                                    <div className='col-3'>
                                        <button className="btn" onClick={() => delTask(item.task_id)}>delete</button>
                                    </div>
                                    <hr />
                                </div>
                            )

                        })

                    }
                </div>
            </div>
        </div>
    )
}

export default Tasky;