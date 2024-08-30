import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { AddVehicle } from './pages/addVehicle/addVehicle';
import { Login } from './pages/login/login.jsx';
import { CreateAccount } from './pages/login/createAccount'
import { Results } from './pages/results/results';
import { Search } from './pages/search/search';
import { Success } from './pages/success/success';
import { Vehicle } from './pages/vehicle/vehicle';
import { About } from './pages/about/about';
import { UpdateUser } from './pages/updateUser/updateUser'
import { logout } from './api/userAPI';
import { MantineProvider, Title, Button } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';


export default function App() {

    function NotFound() {
        return <main>404: This is not the page you are looking for</main>;
    }

    function logoutUser() {
        localStorage.removeItem('username');
        logout()
        navigate('/')
    }

    const navigate = (url) => [
        window.location.href = url
    ]

    return (
        <MantineProvider>
            <BrowserRouter>
                <header className="mainHeader">

                    <div className='brandName'>
                        <Title>
                            frilode
                        </Title>
                    </div>

                    <menu className='navbar'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='search'> Search </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='addVehicle'> List a Vehicle </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='updateUser'> Update Profile </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='about'> About frilode </NavLink>
                        </li>
                        <div className='nav-item'>
                            <Button onClick={() => navigate('/')}> Login </Button>
                        </div>
                        <div className='nav-item'>
                        <Button onClick={() => logoutUser()}> Logout </Button>
                        </div>
                    </menu>

                </header>
                <Routes>
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





