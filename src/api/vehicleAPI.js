
export const createVehicle = async (vehicle) =>  {
    const vehicleString = JSON.stringify(vehicle)
    return await fetch('/api/addVehicle', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: vehicleString
    });
}

export const getVehiclesByType = async (vehicleType) => {
    return await fetch('api/vehicles', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'vehicleType': vehicleType
        }
    })
}

export const rentVehicle = async (vehicle) => {
    return await fetch('/api/rentVehicle', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ 'vehicle-id': vehicle._id })
    })
}
