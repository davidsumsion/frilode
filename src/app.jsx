import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { AddVehicle } from './addVehicle/addVehicle';
import { Login } from './components/login/login.jsx';
import { CreateAccount } from './components/login/createAccount'
import { Results } from './components/results/results';
import { Search } from './components/search/search';
import { Success } from './success/success';
import { Vehicle } from './components/vehicle/vehicle';
import { About } from './about/about';
import { UpdateUser } from './updateUser/updateUser'
import { createTheme, MantineProvider, Title } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const theme = createTheme({
    /** Put your mantine theme override here */
});

export default function App() {
    function logout() {
        // console.log("logging out")
        localStorage.removeItem('username');
        fetch(`/api/auth/logout`, {
            method: 'delete',
        });
    }

    return (
        <MantineProvider theme={theme}>
            <BrowserRouter className='app'>
                <header className="mainHeader">
                    <div className='brandName'>
                        <Title>
                            frilode
                        </Title>
                    </div>
                    <menu className='navbar'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='about'>
                                About
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='search'>
                                Search
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='results'>
                                Results
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='addVehicle'>
                                Add Vehicle
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='success'>
                                Success
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='vehicle'> Vehicle </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='updateUser'> Update User </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to=''> Login </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' onClick={() => logout()} to=''> Logout </NavLink>
                        </li>
                    </menu>
                </header>
                <Routes className='appContent'>
                    <Route path='/' element={< Login />} exact />
                    <Route path='/createAccount' element={< CreateAccount />} exact />
                    <Route path='/search' element={< Search />} exact />
                    <Route path='/results' element={< Results />} exact />
                    <Route path='/success' element={< Success />} exact />
                    <Route path='/vehicle' element={< Vehicle />} exact />
                    <Route path='/addVehicle' element={< AddVehicle />} exact />
                    <Route path='/about' element={<About />} exact />
                    <Route path='/updateUser' element={< UpdateUser />} exact />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <footer>
                </footer>
            </BrowserRouter>
        </MantineProvider>

    )
}


function NotFound() {
    return <main className='container-fluid text-center'>404: Return to sender. Address unknown.</main>;
}


