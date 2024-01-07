import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import NoteContext from '../context/noteContext'

const Signup = (props) => {
    const { showAlert } = props
    const navigate = useNavigate()
    const [data, setData] = useState({ name: "", email: "", password: "" })
    const context = useContext(NoteContext)
    const { setAuthtoken } = context

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Signup")
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: data.name, email: data.email, password: data.password })
        })
        const json = await response.json()
        if (json.success) {
            props.showAlert("Signup successfully", 'success')
            navigate('/')
        }
        else {
            props.showAlert("Invalid Details", 'danger')
        }

    }

    const onchange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div>
                <h2 className='my-4' >Signup</h2>
                <form className='my-2' >
                    <div className="mb-3">
                        <label htmlFor='name' className="form-label">Name</label>
                        <input type="text" className="form-control" value={data.name} name='name' id="name" onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='email' className="form-label">Email</label>
                        <input type="email" className="form-control" value={data.email} name='email' id="email" onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='password' className="form-label">Password</label>
                        <input type="password" className="form-control" value={data.password} name='password' id="password" onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='cpassword' className="form-label">Confirm Password </label>
                        <input type="password" className="form-control" value={data.cpassword} name='cpassword' id="cpassword" onChange={onchange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup