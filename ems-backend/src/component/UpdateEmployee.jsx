
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../features/employeeDetailSlice';

const UpdateEmployee = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { employees, loading, error } = useSelector((state) => state.app);

    useEffect(() => {
        if (id) {
            dispatch(getEmployeeById(id));
        }
    }, [dispatch, id]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    // Update formData when employees is updated
    useEffect(() => {
        if (employees) {
            setFormData({
                firstName: employees.firstName || "",
                lastName: employees.lastName || "",
                email: employees.email || "",
            });
        }
    }, [employees]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateEmployee({ id, employee: formData }));
        navigate(`/individual-employee/${id}`); 
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    // Inline definition of handleChange function
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div>
            <h2>Update Employee</h2>
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <button type="submit">Update Employee</button>
            </form>
        </div>
    ); 
}

export default UpdateEmployee;
