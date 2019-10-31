module.exports = function (sequelize, DataTypes) {
    //1             //2
 return sequelize.define('log', {
     description: DataTypes.STRING, //3
     definition: DataTypes.STRING,
     result: DataTypes.STRING, //3
     owner: DataTypes.INTEGER
 });
};

//1 fx with sequelize object calls on define method
//2 first parameter will create a log table
//3 object with a description, defintion, result, and owner