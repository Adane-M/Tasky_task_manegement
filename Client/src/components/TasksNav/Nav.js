import React from "react";
import { Link } from "react-router-dom";

export const Nav = (props) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/" >TASK MANAGEMENT</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" to='/'>HOME</Link>
                            <Link className="btn" to='/register'>register</Link>
                            <Link className="btn" to='/login'>login</Link>
                            <Link className="btn" to='/about'>About</Link>
                            <Link className="btn" to='/login'>logout</Link>
                        </div>
                    </div>
                </div>

            </nav>

        </>
    )

}
