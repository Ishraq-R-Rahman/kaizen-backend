const mongoose = require("mongoose");

const LoanRequestSchema = new mongoose.Schema({

    Receiver: {type: mongoose.Schema.Types.ObjectId,
                ref: "user"},
    Amount: {type: Number},
    Details: {type: String},
    Status: {type: String}
});

const LoanRequest = mongoose.model("LoanRequest", LoanRequestSchema);

module.exports = LoanRequest;