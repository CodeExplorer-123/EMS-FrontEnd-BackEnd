import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import axiosInstance from "../Inceptors/EmployeeInterceptor";

const API_URL = 'http://localhost:8081/api/employee';

// Create employee
export const createEmployee = createAsyncThunk("employee/createEmployee", async (employee) => {
     try {
        const response = await axios.post(`${API_URL}/create`, employee);
        console.log('employee created', response.data);
        return response.data;
     } catch (error) {
         const errorMessage = error.response?.data?.message || 'Error creating employee';
         throw new Error(errorMessage);
     }
});

// Get employees
export const getEmployees = createAsyncThunk('op/getEmployees', async () => {
    try {
        const response = await axios.get(`${API_URL}/get`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error fetching employees';
        throw new Error(errorMessage);
    }
});

// Get employee by ID
export const getEmployeeById = createAsyncThunk('op/getEmployeeById', async (id) => {
    try {
        const response = await axios.get(`${API_URL}/get/${id}`);
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
        const response = await axiosInstance.delete(`${API_URL}/delete/${id}`);
        return response.data; 
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error deleting employee';
        throw new Error(errorMessage);
    }
});


// Create login action
export const loginEmployee = createAsyncThunk("auth/loginUser",async (authRequest) => {
        try {
            const response = await axios.post("http://localhost:8081/api/auth/login", authRequest);
           localStorage.setItem("user", JSON.stringify(response.data));
           return response.data; 
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error logging in';
            throw new Error(errorMessage);
        }
    }
);


export const employeeDetail = createSlice({
    name: "employeeDetail",
    initialState: {
        employees: [],
        loading: false,
        error: null,
        token:null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginEmployee.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees=action.payload.employeeDto;
                state.token=action.payload.token;
            })
            .addCase(loginEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createEmployee.pending, (state) => {
                state.loading = true;
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees.push(action.payload);
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
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
                state.employees=action.payload;
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
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
            
    },
});

export default employeeDetail.reducer
