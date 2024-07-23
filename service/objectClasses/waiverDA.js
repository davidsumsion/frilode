const MUUID = require('uuid-mongodb')


class Waiver {
    constructor(mediaID, vehicleType){
        // media_id should be a pdf
        // TODO: make pdf verification
        this.mediaID = mediaID
        //verify valid vehicle!
        this.vehicleType = vehicleType

        this.waiverID = MUUID.v4()
    }

    // mediashou ld be a pdf
    updateWaiver(newMediaID){
        this.mediaID = newMediaID
    }
    
     //verify valid vehicle!
    changeVehicleType(newVehicleType){
        this.vehicleType = newVehicleType
    }
}