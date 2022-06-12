import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from '../../App';
import axios from 'axios'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [passw, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()
    const { setAccessToken } = useContext(AppContext)

    const handleAction = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('/users/login', {
                email, passw
            }, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
            console.log('login response', response.data.accessToken);
            setAccessToken(response.data.accessToken)
            navigate('/');
        } catch (e) {
            console.log('login error', e.response.data.msg);
            setMsg(e.response.data.msg)
        }
    }
    return (
        <>
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
                                <h2 className="fw-bold mb-5">LOG-IN</h2>
                                <form onSubmit={handleAction} action="http://localhost:3000">
                                    <div className="form-outline mb-4">
                                        <input type="email" id="form3Example3" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" id="form3Example4" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                                        <label className="form-label" htmlFor="form3Example4">Password</label>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                    Login </button>
                                </form>
                                {msg}
                                <Link to='/register'>register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Login;