
export const createVehicle = async (vehicle) =>  {
    const vehicleString = JSON.stringify(vehicle)
    const response = await fetch('/api/addVehicle', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: vehicleString
    });
    return response
}

export const getVehiclesByType = async (vehicleType) => {
    const response = await fetch('api/vehicles', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'vehicleType': vehicleType
        }
    })
    return response
}