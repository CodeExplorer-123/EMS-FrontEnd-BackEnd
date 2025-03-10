import React from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createEmployee } from '../features/employeeDetailSlice';
import axios from 'axios';

const Register = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [roles,setRoles] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
      dispatch(createEmployee({ firstName, lastName, email,roles, password }));
    
        setFirstName('');
        setLastName('');
        setEmail('');
        setRoles('');
        setPassword('');
    };

  return  (
        <form onSubmit={handleSubmit}>
            <h2>Add Employee</h2>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
             <input
                type="text"
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
                placeholder="Role"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Add Employee</button>
        </form>
    );
};


export default Register