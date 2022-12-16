import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credential;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authTocken);
            navigate("/");
            props.showAlert(" Sign Up Done ", "success ");
        }
        else {
            props.showAlert(" Sign Up Failed ", "danger ");
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} value={credential.name} id="name" name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credential.email} id="email" name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credential.password} id="password" name="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credential.cpassword} id="cpassword" name="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary" >Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
