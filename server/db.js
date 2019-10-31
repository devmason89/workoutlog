const Sequelize = require('sequelize');     //import sequelize package

const sequelize = new Sequelize('workoutlog2', 'postgres', 'cameras.', {
    host:'localhost',
    dialect: 'postgres'
});                       //create sequelize variable to use in the module. created a new sequelize object and connected to our database

sequelize.authenticate().then(
    function() {
        console.log("Connected to workoutlog2 postgres database");
    },
    function(err) {
        console.log(err)
    }
);

//using sequelize variable to access authenticate method. returns a promise and firing a fx to see if we are connected

module.exports=sequelize; 
