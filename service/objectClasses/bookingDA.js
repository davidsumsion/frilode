const MUUID = require('uuid-mongodb')


class Booking{
    constructor(vehicleID, reservedDates){
        this.vehicleID = vehicleID
        //TODO: Format for Dates and how to store multiple days in a row + times
        this.reservedDates = reservedDates
        
        this.bookingID = MUUID.v4()
    }
}