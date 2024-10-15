import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar'; // Correct path to the Navbar component
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './component/Register';
import AllEmployee from './component/AllEmployee';
import IndividualEmployee from './component/IndividualEmployee';
import IndividualEmployeeData from './component/IndividualEmployeeData';
import UpdateEmployee from './component/UpdateEmployee';
import Login from './component/Login';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/all-employee" element={<AllEmployee />} />
                <Route path="/individual-employee" element={<IndividualEmployee />} />
                <Route path="/individual-employee/:id" element={<IndividualEmployeeData />} />
                <Route path="/update-employee/:id" element={<UpdateEmployee />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App
