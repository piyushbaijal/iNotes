import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {

    let navigate = useNavigate();

    const [credential, setCredential] = useState({ email: "", password: "" })
    const handelSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        // console.log(json.name)
        if (json.success) {
            // console.log(JSON.stringify(json.authTocken), "trrrrrr");
            localStorage.setItem('token', json.authTocken);
            localStorage.setItem('name', json.name);
            navigate("/")
            props.showAlert(" Login Successfull", "success ")
        }
        else {
            props.showAlert(" Login Failed", "danger ")
        }

    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credential.email} id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credential.password} id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    )
}

export default Login
