var express = require('express');
var controller = require('./controllers/controller');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
controller(app);

//listen to port
app.listen(3000);
console.log('Server running at port 3000');

