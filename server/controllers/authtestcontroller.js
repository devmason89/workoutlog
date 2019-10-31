let router = require ('express').Router();
let sequelize = require('../db');
let User = sequelize.import('../models/authtest');


//I don't think I used any of this...
//**GETS ALL ITEMS FOR INDIVIDUAL USER */
router.get('/', function (req, res) {
    let userid = req.user.id;

    AuthTestModel 
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

//did not get this one to work

//**GET SINGLE ITEM FOR INDIVIDUAL USER */

router.post('/:id', function (req, res) {
    let data = req.params.id;                  //params point to url
    let userid = req.user.id;

    AuthTestModel
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

//this one is not working. will not return logs specific to that user.

//*DELETE ITEM FOR INDIVIDUAL USER**//

router.delete('/:id', function (req, res) {
    let data = req.params.id;                   //req.params points to the url, not the body
    let userid = req.user.id;                   //our userid set from validate-session

    AuthTestModel
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


//**UPDATE ITEM FOR INDIVIDUAL USER */

router.put('/:id', function (req, res){
    let data = req.params.id;
    let authtestdata = req.body.authtestdata.item;

    AuthTestModel   
        .update({
            authtestdata: authtestdata
        },
        {where: {id: data}}
        ).then(
            function updateSuccess(updatedLog) {
                res.json({
                    authtestdata: authtestdata
                });
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
})

module.exports= router;