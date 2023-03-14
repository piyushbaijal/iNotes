import React from 'react';
import { Link, useLocation } from 'react-router-dom';




const Navbar = (props) => {
    const location = useLocation();
    const { showAlert } = props;
    const name = localStorage.getItem('name')

    const logout = () => {
        localStorage.clear();
        showAlert(" Logout Successfull ", "success ")
    }
    // const [credential, setCredential] = useState({ email: "", password: "" })

    // update name And password
    // const updateName = async () => {
    //     const { name, password } = credential;
    //     const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token': localStorage.getItem('token')
    //         },
    //         body: JSON.stringify({ name, password })
    //     });
    //     const json = await response.json();
    //     console.log(json.name)
    // }
    // console.log(updateName());


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                {/* <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link> */}
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ?
                            <form className="d-flex">
                                <Link className='btn btn-primary mx-1' to="/login" role="button">Login</Link>
                                <Link className='btn btn-primary mx-1' to="/signup" role="button">Sign Up</Link>
                            </form> :
                            <form className="d-flex">
                                <span className='text-light mt-2 mx-2 '>{name}</span>
                                <Link className='btn btn-primary mx-1' to="/login" onClick={logout} role="button">Logout</Link>
                            </form>
                        }
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Navbar
