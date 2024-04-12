import React from 'react';
import { useNavigate } from 'react-router-dom';


export function Search() {
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    const dropdownMenu = document.getElementById('vehicleTypeButton');
    dropdownMenu.classList.toggle('show');
  };


  async function search(VT){
    console.log("reached search")
    var vehicleList = [];
    if (VT === "jetSkiArr") {
        const response = await fetch('/api/jetSki', {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        });
        vehicleList = await response.json();
    }
    if (VT === "snowmobileArr") {
        const response = await fetch('/api/snowmobile', {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        });
        vehicleList = await response.json();
    }
    if (VT === "razorArr") {
        const response = await fetch('/api/razor', {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        });
        vehicleList = await response.json();
    }
    let retList = [];
    for (let i = 0; i < vehicleList.length; i++){
        if(vehicleList[i].rented != true){
            retList.push(vehicleList[i]);
        }
    }
    localStorage.setItem("queryResults", JSON.stringify(retList))
    navigate('/results')
};


return (
    <main className='container-fluid text-center'>
      <h2> Search</h2>
      <div className="btn-group">
            <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" onClick={handleDropdownToggle} aria-expanded="false">
              What do you want to rent?
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" id="vehicleTypeButton">
              <li><a className="dropdown-item" id="jetSki" onClick={() => search('jetSkiArr')}>Jet Ski</a></li>
              <li><a className="dropdown-item" id="snowmobile" onClick={() => search('snowmobileArr')}>Snowmobile</a></li>
              <li><a className="dropdown-item" id="razor" onClick={() => search('razorArr')}>Razor</a></li>
            </ul>
          </div>
    </main>
  );
}