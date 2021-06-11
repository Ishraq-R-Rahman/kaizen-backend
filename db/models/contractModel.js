const mongoose = require("mongoose");
const validate = require('../validate');

const contractSchema = new mongoose.Schema({
    loanId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoanRequest',
        required: true
    },
    
    lenderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    amount: {
        type: Number,
        min: [100 , 'Amount can not be less than 100 bdt'],
        max: [10000 , 'Amount can not be more than 10000 bdt'],
        required: true
    },

    status: {
        type: String,
        enum: ['Pending' , 'Ended'],
        default: 'Pending'
    },

    installments: {
        type: Number,
        default: 1,
        max: [3,"Can't be more than 3 installments"]
    },

    installmentDates: [{
        type: Date
    }]
})


contractSchema.post('update' , async function(){
    const modifiedFields = this.getUpdate().$set;
    console.log(modifiedFields);
})

contractSchema.pre('save', async function(next){
    for( let i = 0; i < this.installments ; i++ ){
        // console.log("Here");
    }
})

const Contract = mongoose.model("contract", contractSchema );


module.exports = Contract;