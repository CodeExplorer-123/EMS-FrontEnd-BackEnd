import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const authResponse = JSON.parse(localStorage.getItem("user")); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {authResponse && (
          <>
            <li><Link to="/all-employee">All Employees</Link></li>
            <li><Link to="/individual-employee">Individual Employee</Link></li>
            <li onClick={handleLogout} className="logout">Logout</li>
          </>
        )}
        {!authResponse && (
          <li><Link to="/login">Login</Link></li>
        )}
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
