require('dotenv').config();       //making .env available to whole application

let express = require('express')    //installing express, it's a dependency
let app=express();                  //fx needed to start express
let authTest = require('./controllers/authtestcontroller');
let user = require('./controllers/usercontroller') //import route we created & store in variable
let login = require('./controllers/logincontroller') //imports logincontroller to make our url work
let log = require('./controllers/logcontroller')
let sequelize = require('./db');

sequelize.sync();  //
app.use(express.json());    //needs to go above any routes. tells application we want json to be used as we process this request
app.use(require('./middleware/headers'))

app.listen(3000, function() {
    console.log('Workout Log Server On!');
})

/**EXPOSED ROUTES */
// app.use('/api/user', user);                   //express function. create base url called /api/user. only do req, res and .send in a controller file

app.use('/api/login', login);  
app.use('/api/user', user);               //creating base url for a login 

/**PROTECTED ROUTES */
app.use(require('./middleware/validate-session'))   //importing validate-session middleware. will check to see if incoming request has a token
app.use('/authtest', authTest)
app.use('/api/log', log)                     //creating a base url for the workout log. should this be a protected route?


