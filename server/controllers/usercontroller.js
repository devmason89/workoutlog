let express = require('express');          //set up express framework
let router = express.Router();             //gives us access to express methods by use of a variable
let sequelize = require('../db');
let User = sequelize.import('../models/user'); //import the user omdel and store in variable
let bcrypt = require('bcryptjs');               //adding a npm package to salt and hash passwords
let jwt = require('jsonwebtoken');              //setting up our tokens





// router.get('/',function(req,res) {                //using express to do a get request. 2 arguments passed thru 
//     res.send("Hey! This is my user route from usercontroller.js!")        //handler fx. listens for requests that match the url route. if detects match, does this callback fx
// })

router.get('/about', function (req, res) {
    res.send("This is how you make subroutes.")
})

// router.get('/tryagain', function (req, res) {
//     res.send("This is how you make ANOTHER subroute.")
// })

//**Create a User Endpoint*/
router.post('/', function (req, res) {
    let username = req.body.user.username;
    let pass = req.body.user.password;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 12)
    }).then(
        function createSuccess(user) {

            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err){
            res.send(500,err.message)
        }
    )
});






module.exports=router;                        //need to export module for usage outside of our file