import React, { useContext, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import NoteContext from '../context/noteContext'

const Navbar = () => {

    let location = useLocation()
    const context = useContext(NoteContext)
    const { setAuthtoken, authtoken } = context

    const handleClick = () => {
        setAuthtoken("")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname == "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname == "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            {!authtoken ? <> <Link className="btn btn-primary mx-1" to="/login" role='button'>Login</Link>
                                <Link className="btn btn-primary mx-1" to="/signup" role='button'>Signup</Link> </> :
                                <Link className="btn btn-primary mx-1" to="/login" onClick={handleClick} role='button'>Logout</Link>
                            }
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar