import React, { useState, useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios'
const Signup = (props) => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [passw, setPassword] = useState('');
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    useEffect(() => {
        setMsg('')
    }, [])

    const handleAction = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post('http://localhost:5000/users/register', {
                fname, lname, email, passw
            }, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
            console.log('LOG SIGNUP:---:', res);
            setMsg(res.data.msg)
            navigate('/login')
        } catch (err) {
            console.log('LOG SIGNUP:-ERR--:', err);
            setMsg(`${err.response.data.msg}`)
        }
    }

    return (
        <>
            <h2>Register page</h2>
            <section className="text-center">
                <div className="p-5 bg-image" style={{
                    backgroundImage: `url('https://mdbootstrap.com/img/new/textures/full/171.jpg')`
                    , height: '30vh'
                }}></div>

                <div className="card mx-4 mx-md-5 shadow-5-strong" style={{
                    marginTop: '-100px',
                    background: 'hsla(0, 0%, 100%, 0.8)',
                    backdropFilter: 'blur(30px)'
                }}>
                    <div className="card-body py-5 px-md-5">

                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h2 className="fw-bold mb-5">Sign up now</h2>
                                <form onSubmit={handleAction}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="form3Example1" className="form-control" onChange={(e) => setFname(e.target.value)} />
                                                <label className="form-label" htmlFor="form3Example1">First name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="form3Example2" className="form-control" onChange={(e) => setLname(e.target.value)} />
                                                <label className="form-label" htmlFor="form3Example2">Last name</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="email" id="form3Example3" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" id="form3Example4" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                                        <label className="form-label" htmlFor="form3Example4">Password</label>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        Sign up
                                    </button>

                                </form>
                                {msg}
                                <Link to='/login'>Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Signup;