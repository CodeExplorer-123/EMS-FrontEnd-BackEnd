import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, getEmployees } from '../features/employeeDetailSlice';
import { useNavigate } from 'react-router-dom';

const AllEmployee = () => {
    const dispatch = useDispatch();
    const { employees, loading, error } = useSelector((state) => state.app);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]); // Include dispatch as a dependency

    if (loading) {
        return <h2>Loading...</h2>;
    }

    const handleView = (id) => {
        navigate(`/individual-employee/${id}`);
    }

    const handleUpdate = (id) => {
        navigate(`/update-employee/${id}`);
    }
    
    const handleDelete = (id) => {
        dispatch(deleteEmployee(id));
    }

    return (
        <div>
            <h2>Employee List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th> {/* Added header for actions */}
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.firstName}</td> 
                            <td>{employee.lastName}</td>   
                            <td>{employee.email}</td>         
                            <td>
                                <button onClick={() => handleView(employee.id)}>View</button>
                            </td>
                            <td>
                                <button onClick={()=>handleDelete(employee.id)}>Delete</button>
                            </td>
                            <td>
                                <button onClick={()=>handleUpdate(employee.id)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllEmployee;
