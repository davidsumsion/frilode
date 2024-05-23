import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { AddVehicle } from './addVehicle/addVehicle';
import { Login } from './login/login.jsx';
import { Results } from './results/results';
import { Search } from './search/search';
import { Success } from './success/success';
import { Vehicle } from './vehicle/vehicle';


export default function App() {
    function logout() {
        // console.log("logging out")
        localStorage.removeItem('username');
        fetch(`/api/auth/logout`, {
          method: 'delete',
        });
      }

    return (
        <BrowserRouter className='app'>
                <header className="mainHeader">
                    <div className='brandName'>
                        <h1>
                            frilode
                        </h1>
                    </div>
                    {/* <nav className='navbar'> */}
                        <menu className='navbar'>
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
                                <NavLink className='nav-link' to='vehicle'>
                                    Vehicle
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to=''>
                                Login
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' onClick={() => logout()} to=''>
                                Logout
                                </NavLink>
                            </li>
                        </menu>
                    {/* </nav> */}
                </header>
                <Routes className='appContent'>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/search' element={<Search />} exact />
                    <Route path='/results' element={<Results />} exact />
                    <Route path='/success' element={<Success />} exact />
                    <Route path='/vehicle' element={<Vehicle />} exact />
                    <Route path='/addVehicle' element={<AddVehicle />} exact />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <footer className='gradient-footer'>
                    <div className="accordion" id="helpAccordion">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingHelp">
                                <button 
                                    className="accordion-button collapsed" 
                                    type="button" 
                                    data-bs-toggle="collapse" 
                                    data-bs-target="#collapseHelp" 
                                    aria-expanded="false" 
                                    aria-controls="collapseHelp">
                                    Need Help?
                                </button>
                            </h2>
                            <div 
                                id="collapseHelp" 
                                className="accordion-collapse collapse" 
                                aria-labelledby="headingHelp" 
                                data-bs-parent="#helpAccordion">
                                <div className="accordion-body">
                                    <p><strong>Text 801-682-2893 outlining your problem</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
        </BrowserRouter>
    )
}


function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }


