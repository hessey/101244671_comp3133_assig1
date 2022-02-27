const mongoose = require('mongoose')

const CreateListSchema = new mongoose.Schema({
    listing_id:{
        type: String,
        required: [true, "An id is required"]
    },
    listing_title:{
        type: String,
        required: [true, "An title is required"]
    },
    description:{
        type: String,
        required: [true, "An description is required"]
    },
    street:{
        type: String,
        required: [true, "An street is required"]
    },
    city:{
        type: String,
        required: [true, "An id is required"]
    },
    postal_code:{
        type: String,
        required: [true, "An id is required"]
    },
    price:{
        type: Number,
        required: [true, "An price is required"]
    },
    email:{
        type: String,
        required: true,
        uppercase: true,
        validate: function(value){
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        }
    },
    username:{
        type: String,
        required: [true, "An username is required"]
    }
})

const CreateList = mongoose.model("CreateList", CreateListSchema)
module.exports = CreateList