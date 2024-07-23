const MUUID = require('uuid-mongodb')

class Media {
    //TODO: video and picture formats
    constructor(video, picture, waiverForm){
        this.video = video
        this.picture = picture
        this.waiverForm = waiverForm

        this.mediaID = MUUID.v4()
    }

    //TODO getters and setters
}