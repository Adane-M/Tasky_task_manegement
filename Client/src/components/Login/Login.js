import React, { useState } from "react";
import PropTypes from 'prop-types';
// import LoginUser from './LoginUser';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // async function handlesubmit(e) {
    //     e.preventDefault();
    //     const token = await LoginUser({
    //         username,
    //         password
    //     });
    //     setToken(token)
    //     localStorage.setItem('token',token)
    // };
const handlesubmit =(e)=>{
    const user ={
        username:username,
        password:password
    };

    fetch('/auth/login' ,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user:user})
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data);
    })
    .catch(err => console.log('user login error:', err))
}


    return ( 
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
                            <h2 className="fw-bold mb-5">Login</h2>
                            <form onSubmit={handlesubmit}>

                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example3">User Name</label>
                                    <input type="text" id="form3Example3" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example4">Password</label>
                                    <input type="password" id="form3Example4" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mb-4">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
    
}
// {/* 
// <form onSubmit={handlesubmit}>
//     User name : <input type='text' name="uname" placeholder="enter user name" onChange={(e) => setUsername(e.target.value)} />
//     <br />
//     Password : <input type='password' name="password" placeholder="enter passward" onChange={(e) => setPassword(e.target.value)} />
//     <button type="submit">login</button>

// </form> */}

export default Login;
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
