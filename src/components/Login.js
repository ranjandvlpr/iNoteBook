import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import NoteContext from '../context/noteContext'

const Login = (props) => {
    const navigate = useNavigate()
    const [data, setData] = useState({ email: "", password: "" })
    const context = useContext(NoteContext)
    const { setAuthtoken } = context

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Login")
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: data.email, password: data.password })
        })
        const json = await response.json()
        if (json.success) {
            setAuthtoken(json.authtoken.toString())
            navigate('/')
            props.showAlert("Success: Login successfully", 'success')
        }
        else {
            props.showAlert("Danger: Invalid Details", 'danger')
        }
    }

    const onchange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h2 className='my-4' >Login</h2>
            <form className='my-2' >
                <div className="mb-3">
                    <label htmlFor='email' className="form-label">Email</label>
                    <input type="email" className="form-control" value={data.email} name='email' id="email" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor='password' className="form-label">Password</label>
                    <input type="password" className="form-control" value={data.password} name='password' id="password" onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )
}

export default Login