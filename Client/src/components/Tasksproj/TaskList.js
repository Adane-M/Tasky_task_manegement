import React, { useState, useEffect , useContext } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { AppContext } from '../../App';
import jwt_decode from 'jwt-decode'
import Loading from './Loading';
import axios from 'axios'
const TaskList = (props) => {
    const { accessToken } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(false);
    const [task, setTask] = useState({});
    const [tasks, setTasks] = useState([]);
    const [userId, setUserId] = useState('')
    const [email, setEmail] = useState('')
    const [exp, setExp] = useState()
    const navigate = useNavigate()

    // user_id = 2;
    // let setUrl ='http://localhost:5000/task/all/'+user_id;

    const decode = jwt_decode(accessToken)
    setUserId(decode.userId)
    setEmail(decode.email)
    const expire = decode.exp
    setExp(new Date(expire * 1000).toString())
    if (expire * 3000 < new Date().getTime()) {
        navigate('/login')
    }
    // useEffect(() => {
    //     const getTasksByUser = async () => {
    //         setIsLoading(true)
            
    //         try {
    //             const res = await fetch(setUrl)
    //             const data = await res.json();
    //             setIsLoading(false)
    //             console.log(data);
    //             // const arr = data.sort((a, b) => b.task_id - a.task_id)
    //             setTasks(data);
    //         }
    //         catch (err) {
    //             setIsLoading(false)
    //             console.log(err);
    //         }
    //     }
    //     getTasksByUser();
    // },[setUrl]);

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
    const addtask = (e) => {
        e.preventDefault();
        console.log(task);
        fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: task })
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


    return (
        <div className='wraper' style={{ textAlign: 'center' }}>
            <h1 className="mb-3">wellome to your task manager</h1>
{/* <h1>userId : {userId } email :{email} exp :{exp} </h1> */}
            <form onSubmit={addtask}>
                <input className='col-8' type='text' onChange={(e) => setTask(e.target.value)} />
                <button type='submit'>add task</button>
            </form>


            {/* <div className='container'>
                {!isLoading ? <Loading /> :
                    tasks.map(item => {

                        return (
                            <div className='row' key={item.task_id}>
                                <div className='col-7'>
                                    <div onClick={(e) => updateTaskComplete(e, item.task_id, item.complete)}> {item.task_name} </div>
                                </div>
                                <div className='col-2'>
                                    <Link className="btn linkTo" to={`/${user_id}/${item.task_id}`} > update </Link>
                                </div>
                                <div className='col-3'>
                                    <button className="btn" onClick={() => delTask(item.task_id)}>delete</button>
                                </div>
                                <hr />
                            </div>
                        )

                    })

                }
            </div> */}

        </div>
    )
};
export default TaskList;