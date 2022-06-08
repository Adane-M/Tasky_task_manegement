import React from "react";
import { Link } from "react-router-dom";

export const Nav = (props) => {
    return (

        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="/" style={{ fontFamily: 'Roboto' }}>TASK MANAGEMENT</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active , btn" aria-current="page" to='/'>HOME</Link>
                        {/* <Link className="nav-link" to='/:id'>TASK</Link> */}
                        {/* <Link className="btn" to='/'></Link> */}
                        {/* <Link className="btn" to='/Ta'>Task</Link> */}
                        <Link className="btn" to='/register'>register</Link>
                        <Link className="btn" to='/login'>login</Link>
                        <Link className="btn" to='/logout'>logout</Link>
                        {/* <a className="nav-link" href="/about">About</a>
                        <a className="nav-link" href="/Features">Features</a> */}
                    </div>
                </div>
            </div>
        </nav>

    )

}
