import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getEmployeeById } from '../features/employeeDetailSlice';
import { useNavigate } from 'react-router-dom';

const IndividualEmployee = () => {
     const [employeeId, setEmployeeId] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (employeeId) {
            navigate(`/individual-employee/${employeeId}`);
        }
    };
    return (
        <div>
            <h2>Search Employee by ID</h2>
            <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Enter Employee ID"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default IndividualEmployee