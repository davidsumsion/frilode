import React from 'react';

export function Results() {

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

  var queryResultsDisplay = []
  const data = JSON.parse(localStorage.getItem("queryResults"))
  if (data.length){
    for (let i = 0; i < data.length; i++){
      // jsonObject = JSON.parse(data[i]);
      const jsonObject = data[i];
      const tempVehicle = new Vehicle(jsonObject.vehicleType, jsonObject.name, jsonObject.priceDay, jsonObject.priceHour, jsonObject.make, jsonObject.model, jsonObject.description, jsonObject.image, jsonObject.rented)
      queryResultsDisplay.push(
        <div className="card">
              <img className="market-photos" src={tempVehicle.image} alt="Example img1"></img>
              <h3>JetSki Example 3</h3>
              <p>
                  Price/day: 60$
                  Price/hour: 25$
                  Make: SkiDoo
                  Model: 2021 splasher
              </p>
              <form method="get" action="examplevehicle.html">
                  <button type="submit" className="btn btn-primary btn-sm">See More Information</button>        
              </form>
        </div>
      );      
    }
  } else {
    console.log('no data!')
  }
  return (
    <main className='container-fluid text-center'>
      <div>results displayed here</div>
      <div id='containers'>{queryResultsDisplay}</div>
    </main>
  );
}