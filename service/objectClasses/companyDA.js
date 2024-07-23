const MUUID = require('uuid-mongodb')

class company {
    constructor(admin){
        this.admin = admin

        this.employees= []
        this.companyMedia = []
        this.companyID = MUUID.v4();
    }
}   

