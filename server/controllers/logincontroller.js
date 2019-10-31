// let router = require('express').Router(); 
let express = require('express');          //set up express framework
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user'); //import the user omdel and store in variable
let bcrypt = require('bcryptjs');               //adding a npm package to salt and hash passwords
let jwt = require('jsonwebtoken');


//*Creating a Log In Method*/

// router.post('/',function(req,res) {                
//     User.findOne( { where: {username:req.body.user.username}}).then(

//         function(user) {
//             if(user) {             //checking to make sure password match was found
//                 //2 using bcrypt to decrypt the hash value and compare to supplied password
//                              //3 password from current request //4 from database
//             bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches){
//                 if(matches){
//                     let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
//                     res.json({
//                         user: user,
//                         message: "successfully authenticated",
//                         sessionToken: token
//                     });
//          } else {
//                 res.status(502).send({ error: 'Bad Gateway. Poor IP communication between back-end computers'});
//          }
//         });
//         } else {
//                 res.status(500).send({error: "failed to match password"})
//             }
//         },
//         function (err){
//             res.status(501).send({error: "web server does not understand HTTP method"});
//         }   
//     )
// });


//**Creating a Sign-in Route */
    //sending data, so need to use a post
    router.post('/', function(req, res) {
        //7        //8        //9                    //10
 User.findOne( {where: { username: req.body.user.username}}).then(

     //11 checking to make sure match for username is found
     function (user){
         if (user) {
                //12               //13                  //14                      //15
             bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                 //17
                 if (matches) {
                     //18
                     let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                     res.json( {     //19
                         user: user,
                         message: "successfully authenticated",
                         sessionToken: token 
                     });
         } else {     //20
             res.status(502).send({error: "you failed, yo"}); //fx called if promise rejected. print error to console
         }
     });
         } else {
             res.status(500).send({error: "failed to authenticate"});
         }
     },
     function (err){
         res.status(501).send({error:"you failed, yo"});
     }
 );
});




module.exports=router; 