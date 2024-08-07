import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import UserContext from '../hooks/UserContext';
import '../index.css'; 

const Sidebar = () => {
    const { user } = useContext(UserContext);

    console.log("Sidebar user ", user); 

    return (
        <div className="sidebar">
            <div className="profile">
                {user ? (
                    <>
                        <h2 className="fw-bold">Hello, {user.username}</h2>
                        <p>{user.email}</p>
                    </>
                ) : (
                    <h2 className="fw-bold">Hello, Guest</h2>
                )}
            </div>
            <Nav className="nav-links">
                <Nav.Link as={NavLink} exact to="/">
                    <FaHome className="me-2" /> Home
                </Nav.Link>
                {!user && (
                    <>
                        <Nav.Link as={NavLink} to="/login">
                            <FaUser className="me-2" /> Login
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/register">
                            <FaSignOutAlt className="me-2" /> Register
                        </Nav.Link>
                    </>
                )}
                {user && (
                    <>
                        {user.isAdmin && (
                            <Nav.Link as={NavLink} to="/admin">
                                <FaUser className="me-2" /> Admin Dashboard
                            </Nav.Link>
                        )}
                        <Nav.Link as={NavLink} to="/logout">
                            <FaSignOutAlt className="me-2" /> Logout
                        </Nav.Link>
                    </>
                )}
            </Nav>
        </div>
    );
};

export default Sidebar;
