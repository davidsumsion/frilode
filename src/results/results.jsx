import React from 'react';
import './results.css'
import { useNavigate } from 'react-router-dom';


export function Results() {
  const navigate = useNavigate();

  class Vehicle {
    constructor(vehicleType, name, priceDay, priceHour, make, model, description, image, rented=false){
        this.vehicleType = vehicleType;
        this.name = name;
        this.priceDay = priceDay;
        this.priceHour = priceHour;
        this.make = make;
        this.model = model;
        this.description = description;
        this.image = image;
        this.rented = rented;
    }
    getName(){ return this.name; }
    getPriceDay(){ return this.priceDay; }
    getPriceHour(){ return this.priceHour; }
    getMake(){ return this.make; }
    getModel(){ return this.model; }
    getDescription(){ return this.description; }
    getImage(){ return this.image; }
  }

  
  function viewVehicle(myVehicle) {
    localStorage.setItem("selectedVehicle", JSON.stringify(myVehicle));
    //change windows
    navigate('/vehicle')
  }


  var queryResultsDisplay = []
  const data = JSON.parse(localStorage.getItem("queryResults"))
  if (data.length){
    for (let i = 0; i < data.length; i++){
      // jsonObject = JSON.parse(data[i]);
      const tempVehicle = data[i];
      // const tempVehicle = new Vehicle(jsonObject.vehicleType, jsonObject.name, jsonObject.priceDay, jsonObject.priceHour, jsonObject.make, jsonObject.model, jsonObject.description, jsonObject.image, jsonObject.rented)
      queryResultsDisplay.push(
        <div className="card">
              <img className="market-photos" src={tempVehicle.image} alt={tempVehicle.name}></img>
              <h3>{tempVehicle.name}</h3>
              <p>
                  Price/day: {tempVehicle.priceDay}$
                  Price/hour: {tempVehicle.priceHour}
                  Make: {tempVehicle.make}
                  Model: {tempVehicle.model}
              </p>
              <button type="submit" className="btn btn-primary btn-sm" onClick={() => viewVehicle(tempVehicle)} >See More Information</button>        
        </div>
      );      
    }
  } else {
    console.log('no data!')
  }

  return (
    <div className="overview">
      <h2> Results of your search: </h2>
      <div className="containerMarketplace">
           {queryResultsDisplay}
      </div>
    </div>
  );
}






// <div className="card">
//       <img className="market-photos" src={tempVehicle.image} alt={tempVehicle.name} />
//       <h3>{tempVehicle.name}</h3>
//       <p>
//         Price/day: {tempVehicle.priceDay}$<br />
//         Price/hour: {tempVehicle.priceHour}$<br />
//         Make: {tempVehicle.make}<br />
//         Model: {tempVehicle.model}
//       </p>
//       <button type="submit" className="btn btn-primary btn-sm" onClick={rent}>
//         See More Information
//       </button>
//     </div>