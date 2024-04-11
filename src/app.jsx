import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
        <div>
            <header id="myHeader" class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <h1 style={{paddingLeft: '25px'}}>frilode</h1>
                </a>
                <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" style={{paddingRight:'20px'}}>
                    <li><a href="query.html" class="nav-link px-2 link-dark">Search</a></li>
                    <li><a href="marketplace.html" class="nav-link px-2 link-dark">Results</a></li>
                    <li><a href="examplevehicle.html" class="nav-link px-2 link-dark">Vehicle</a></li>
                    <li><a href="availability.html" class="nav-link px-2 link-dark"> MyAvailability </a></li>
                    <li><a href="VehicleAdded.html" class="nav-link px-2 link-dark"> Success </a></li>
                    <li><a href="addAnotherVehicle.html" class="nav-link px-2 link-dark"> Add Vehicle</a></li> 
                </ul>
                <div class="col-md-3 text-end" style={{paddingRight:'20px'}}>
                    <a href="index.html" class="btn btn-dark">Login to Rent</a>
                    <button type="button" class="btn btn-dark" onclick="logout()">Logout</button>
                </div>
                <hr />
            </header>
            <main> APP COMPONENETS GO HERE</main>
            <footer style={{padding: '20px'}}>
                <div class="bd-example">
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">About the Developer</button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>
                                        <p> David Sumsion</p>
                                        <a href="https://github.com/davidsumsion/Startup">MyGitHub</a>
                                    </strong> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
//   return <div className='body bg-dark text-light'>App will display here</div>;
}



