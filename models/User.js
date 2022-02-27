const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "A user name is a must"],
        unique: [true, "This user already exists"]
    },
    firstname:{
        type:String,
        required:[true, "Please enter first name"],
    },
    lastname:{
        type:String,
        required:[true, "Please enter first name"],
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
    password:{
        type: String,
        required: [true, 'A password is required'],
        minlength: 6
    },
    type:{
        type: String,
        required: [true, 'this is a must']
    }
})
 

const User = mongoose.model("User", UserSchema)
module.exports = User