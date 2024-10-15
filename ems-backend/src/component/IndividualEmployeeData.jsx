import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeById } from '../features/employeeDetailSlice';
import { useParams } from 'react-router-dom';

const IndividualEmployeeData = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { employees, loading, error } = useSelector((state) => state.app); // Access app state

    useEffect(() => {
        dispatch(getEmployeeById(id));
    }, [dispatch, id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;


    if (!employees) return <p>No employee data found.</p>;

    return (
        <div>
            <h2>Employee Details</h2>
            <p>First Name: {employees.firstName}</p>
            <p>Last Name: {employees.lastName}</p>
            <p>Email: {employees.email}</p>
            <p>Roles: {employees.roles}</p>
        </div>
    );
};

export default IndividualEmployeeData;
