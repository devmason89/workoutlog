module.exports = function (sequelize, DataTypes) {
    //1             //2
 return sequelize.define('user', {
     username: DataTypes.STRING, //3
     passwordhash: DataTypes.STRING //3
 });
};

//1 fx with sequelize object calls on define method
//2 first parameter will create a users table
//3 object with a username and passwordhash