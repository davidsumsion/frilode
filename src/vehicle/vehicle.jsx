import React from 'react';
import './vehicle.css'


export function Vehicle() {



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

  const vehicle = JSON.parse(localStorage.getItem("selectedVehicle"));



  return (
    <main className='container-fluid text-center'>
      <div className="bd-example">
        <h2 id="descriptivetitle">{vehicle.name}</h2>
        <div className="container">
          <div className="card">
            <img className="market-photos" id= 'specImg' src="" alt="Example img1"></img>
            <h3 id="specTitle">{vehicle.name}</h3>
            <p id = "specInfo">
                Price/day: {vehicle.priceDay}$
                Price/hour: {vehicle.priceHour}$
                Make: {vehicle.make}
                Model: {vehicle.model}
            </p>
            <div className="card long">
              <h5>
                Description: 
              </h5>
              <p id="longDescription">{vehicle.description}</p>
          </div>
        </div>
      </div>
      <div className="col-md-3 text-end">
        <a id="rent" className="btn btn-dark">Book Now</a>
      </div>
    </div>
  </main>
  );
}