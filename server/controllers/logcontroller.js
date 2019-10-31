let router = require('express').Router(); 
let sequelize = require('../db');
let Log = sequelize.import('../models/log'); //import the log model and store in variable
let bcrypt = require('bcryptjs');               //adding a npm package to salt and hash passwords
let jwt = require('jsonwebtoken');



//**Post with the Log */
router.post('/',function(req,res) {              
    let description = req.body.log.description;             //semicolons go here
    let definition = req.body.log.definition;
    let result = req.body.log.result;
    let owner = req.body.log.owner;

    Log.create({
        description: description,                        //commas go here when creating object
        definition: definition,
        result: result,
        owner: owner
    }).then(
        function createLog(log){

            let token = jwt.sign({id: owner.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

            res.json({
                description: description,                        
                definition: definition,
                result: result,
                owner: owner,
                message: "logged",
                sessionToken: token

            });
        },
        function createError(err){
            res.send(500, err.messge);
        }
    )
           //handler fx. listens for requests that match the url route. if detects match, does this callback fx
});


//*GETS ALL ITEM FOR INDIVIDUAL USER*/
router.get('/', function (req, res) {
    let userid = req.user.id

    Log
    .findAll({
        where: {owner: userid}
    })
    .then(
        function findAllSuccess(data) {
            res.json(data)
        },
        function findAllError(err){
            res.send(500, err.message)
        }
    )
})

//**GET SINGLE ITEM FOR INDIVIDUAL USER */

router.get('/:id', function (req, res) {
    let data = req.params.id;                  //params point to url
    let userid = req.user.id;

    Log
        .findOne({
            where: {id: data, owner: userid}
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        )
})

//works!


//*DELETE ITEM FOR INDIVIDUAL USER**//

router.delete('/:id', function (req, res) {
    let data = req.params.id;                   //req.params points to the url, not the body
    let userid = req.user.id;                   //our userid set from validate-session

    Log
    .destroy( {
        where: { id: data, owner: userid}
    }).then(
        function deleteLogSuccess(data){
            res.send("you removed a log")
        },
        function deleteLogError(err){
            res.send(500, err.message)
        }
    )
})

//this works!!


//**UPDATE ITEM FOR INDIVIDUAL USER */

router.put('/:id', function (req, res){
    let data = req.params.id;
    let description = req.body.log.description;      
    let definition = req.body.log.definition;
    let result = req.body.log.result;
    let owner = req.body.log.owner;


    Log   
        .update({
            description: description,
            definition: definition,
            result: result,
            owner: owner
        },
        {where: {id: data}}
        ).then(
            function updateSuccess(updatedLog) {
                res.json({
                    description: description,     // how do i make an update for all of the keys? 
                    definition: definition,
                    result: result,
                    owner: owner
                });
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});


module.exports=router; 