const mongoose = require("mongoose");
const validate = require('../validate');

const userSchema = new mongoose.Schema({
   
    username: {
        type: String,
        required: true,
        validate : {
            validator: validate.validateString,
            msg: 'Name can not be empty.'
        }
    },

    password: {
        type: String,
        required: true,
        validate: {
            validator: validate.validateString,
            msg: 'Invalid password'
        }
    },

    dob: {
        type: Date,
        // makes sure the user is over 18 years old
        validate: {
            validator: validate.validateAge,
            msg: 'Age can not be less than 18 years.'
        }
    },

    email: {
        type: String,
        unique: true,
        validate: {
            validator: validate.validateEmail,
            msg: 'Invalid email address.'
        }
    },

    nid: {
        type: String,
        unique: true,
        validate: {
            validator: checkNID,
            msg: 'NID is not valid.'
        }
    },

    bkash: {
        type: String,
        unique: true,
        validate: {
            validator: validate.validatePhone,
            msg: 'Invalid phone number.'
        }
    },

    usertype: {
        type: String,
        enum: ['Lender' , 'Receiver'],
        default: 'Receiver'
    }
});


/// Validate NID
function checkNID( NID ) {
    if( NID > 0 ){
        console.log(this.username + " : " + this.dob );
        return true;
    }

    else {
        return false;
    }
}

const User = mongoose.model("user", userSchema);



module.exports = User;