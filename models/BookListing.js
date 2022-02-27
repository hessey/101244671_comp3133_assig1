const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    listing_id:{
        type: String,
    },
    booking_id:{
        type: String,
    },
    booking_date:{
        type: String,
    },
    booking_start:{
        type: String,
    },
    booking_end:{
        type: String,
    },
    username:{
        type:String,
        required: [true, "this is mandatory"]
    }

})


const BookList = mongoose.model("Booking", BookingSchema)
module.exports = BookList