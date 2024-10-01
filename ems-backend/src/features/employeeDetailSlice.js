import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = 'https://66fb9bb78583ac93b40c6797.mockapi.io/crud/crud';

// Create employee
export const createEmployee = createAsyncThunk('op/createEmployee', async (employee) => {
    try {
        const response = await axios.post(API_URL, employee);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error creating employee';
        throw new Error(errorMessage);
    }
});

// Get employees
export const getEmployees = createAsyncThunk('op/getEmployees', async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error fetching employees';
        throw new Error(errorMessage);
    }
});

// Get employee by ID
export const getEmployeeById = createAsyncThunk('op/getEmployeeById', async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
         const errorMessage = error.response?.data?.message || 'Error fetching employee';
        throw new Error(errorMessage);
    }
});

// Update employee
export const updateEmployee = createAsyncThunk('op/updateEmployee', async ({ id, employee }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, employee);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error updating employee';
        throw new Error(errorMessage);
    }
});


// Delete employee
export const deleteEmployee = createAsyncThunk('op/deleteEmployee', async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data; 
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error deleting employee';
        throw new Error(errorMessage);
    }
});


export const employeeDetail = createSlice({
    name: "employeeDetail",
    initialState: {
        employees: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEmployee.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear previous errors
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees.push(action.payload);
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Use action.error.message
            })
             .addCase(getEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getEmployeeById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEmployeeById.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(getEmployeeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees.push(action.payload);
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally handle response message if needed
                console.log(action.payload); // "employee deleted"
                // Filter out the deleted employee from the state
                state.employees = state.employees.filter(emp => emp.id !== action.meta.arg);
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
            
    },
});

export default employeeDetail.reducer
