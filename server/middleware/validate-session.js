let jwt = require('jsonwebtoken');
let sequelize = require('../db');
let User = sequelize.import('../models/user');

module.exports = function (req, res, next) {
    if (req.method == 'OPTIONS') {
        next()
    } else {
        let sessionToken = req.headers.authorization;
        // console.log(SessionToken)               //take this out after sure it works
        if(!sessionToken) return res.status(403).send({auth: false, message: "No token provided."});
        else {
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
                if(decoded) {
                    User.findOne({where: {id: decoded.id}}).then(user => {
                        req.user = user;
                        next();
                    },
                    function() {
                        res.status(401).send({error: "Not authorized. Means could not match a username in our database to your request"});
                    });
                } else {
                    res.status(400).send({error:"Bad URL"});
                }
            });

        }
    }
}