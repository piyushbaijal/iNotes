import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';





const Navbar = (props) => {
    const location = useLocation();
    // const navigate = useNavigate;
    const { showAlert } = props;

    const logout = () => {
        localStorage.removeItem('token');
        // navigate('/login')
        showAlert(" Logout Successfull ", "success ")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ?
                            <form className="d-flex">
                                <Link className='btn btn-primary mx-1' to="/login" role="button">Login</Link>
                                <Link className='btn btn-primary mx-1' to="/signup" role="button">Sign Up</Link>
                            </form> :
                            <form className="d-flex">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" href="/">Action</a></li>
                                            <li><a className="dropdown-item" href="/">Another action</a></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" href="/">Something else here</a></li>
                                        </ul>
                                    </li>
                                </ul>
                                <Link className='btn btn-primary mx-1' to="/login" onClick={logout} role="button">Logout</Link>
                                {/* <button className='btn btn-primary mx-1' onClick={logout}>Logout</button> */}
                            </form>
                        }
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Navbar
