const dotenv = require('dotenv');
dotenv.config({ path : './config/config.env'});

const env = process.env.NODE_ENV;
console.log(env);

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./db/models/userModel") ;
const LoanRequest = require("./db/models/LoanRequestModel");

const PORT = process.env.PORT || 5000;

/** Require Routes */
const authRouter = require('./routes/auth')

// Conncet to the database
const { mongoose } = require('./db/mongoose');


/******************************************* MIDDLEWARE  ****************************************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------


app.use('/api/auth', authRouter );



// app.get("/user", (req, res) => {
//     if(req.user)
//     res.send(req.user);// The req.user stores the entire user that has been authenticated inside of it.
//     else res.send("Unauthorized");
// });





// app.get("/getLoanRequests",(req,res)=>{
//     LoanRequest.find({}, function(err, requests) {
//         let req_Map = {};

//         requests.forEach(function(request) {
//             req_Map[request._id] = request;
//         });

//         res.json(requests);
//     });
// });

// app.post('/createLoanRequest', async(req,res) =>{
//     console.log(req.user);
//     let user;
//     User.findOne({ username: req.user },(err,doc)=>{
//        user = doc;
//        console.log(user);
//     });
//     const newRequest = new LoanRequest({
//         Receiver: user,
//         Amount: req.body.Amount,
//         Details: req.body.Details,
//         Status: "New"
//     });
//     await newRequest.save();
//     res.send("Successfully Created LoanRequest");

// });



// app.get("/loanRequest/:id",async (req,res)=>{
//         const data = await LoanRequest.findById(req.params.id);
//         console.log(data);
//         res.status(200).json(data);

// });



//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(PORT, () => console.log(`server running at port ${PORT}`))