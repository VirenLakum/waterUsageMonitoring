var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var EJSON = require('mongodb-extended-json');
var DateTime = require('datetime-converter-nodejs');
var isodate = require('isodate');
var moment = require('moment');
moment().format();

//Connect to database
//mongoose.connect('mongodb://admintest:admintest@ds035693.mlab.com:35693/tod0');
mongoose.connect('mongodb://localhost:27017/waterIoT');

//Create a schema - this is like a blueprint
var userSchema = new  mongoose.Schema({username: {type: String, unique: true},
    password: {type: String}});

var deviceData = new mongoose.Schema({waterUsed: Number}, { timestamps: { createdAt: 'created_at' } });

var buttonState = new mongoose.Schema({State: Boolean});

var UserAuth = mongoose.model('UserAuth', userSchema);

var DeviceData = mongoose.model('DeviceData', deviceData);

var ButtonState = mongoose.model('ButtonState', buttonState);

var StartDate = null;
var lastValue = null;

// var newState = ButtonState({State: true}).save(function (err) {
//     if (err) throw err;
// });

// var newUser = UserAuth({username: "test", password: "testdevice"}).save(function (err) {
//     if (err) throw err;
// });


var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/login', function(req, res){
        res.render('login');
    });

    app.get('/all', function (req, res) {

        DeviceData.aggregate({$group: {_id: "first", firstEntry: { $first: "$$ROOT" }}}, function(err, data){
            console.log(data);
            var Sdata = EJSON.stringify(data);
            var index = Sdata.indexOf("created_at");
            var CA = Sdata.substr(144,24);              //substring to extract date
            StartDate = new Date(CA).toUTCString();
            console.log(StartDate);
            var temp = CA.replace(/T.+/, '');           //ISO to UTC through replacing T
            var onlyDate = new Date(temp);
            console.log(temp);
            //onlyDate.setDate(onlyDate.getDate() + 1);   //incrementing Date
            onlyDate.setHours(23,59,59,999);
            console.log(onlyDate);

            DeviceData.aggregate([{$match: {created_at: {$lt: onlyDate}}}, {$group: {_id: null , firstEntry: { $last: "$$ROOT" }}}], function(err, some){
                console.log(some);
            });
        });
    });

    app.get('/jknfkajdnffiuofadsftoday12123nkjnkkjn', function (req, res) {
        var start = new Date();
        start.setHours(0,0,0,0);

        var end = new Date();
        end.setHours(23,59,59,999);
        DeviceData.find({created_at: {$gte: start, $lt: end}}, function (err, data) {
            if(err) throw err;
            //console.log(data);
            ButtonState.find({}, function (err, state) {
                //console.log(state);
                var temp = (lastValue/135)*100;
                //var temp1 = { _id: null, Percentage: temp, __v: 0 };
                var percentage = JSON.parse(' {"Percentage": 0 } ');
                percentage.Percentage = temp;
                //console.log(percentage);
                res.render('devicedata', {datas: data, states: state, percentages: percentage});
            });
        });
    });

    app.get('/waterUsed', function (req, res) {
        //get data from the ESP and add it to mongoDB
        console.log("got request" + req);
        var query_index = req.url.indexOf('?');
        var query_string = (query_index>=0)?req.url.slice(query_index+1):'';
        console.log(query_string);
        if(query_string != ""){
            var currentValue = parseFloat(query_string);
            if (currentValue < lastValue){
                //noinspection JSAnnotator
                currentValue += lastValue;
                lastValue = currentValue;
                console.log("less");
            }
            else {
                lastValue = parseFloat(query_string);
            }

            var newData = DeviceData({waterUsed: currentValue.toString()}).save(function (err) {
                if (err) throw err;
            });
        }
        ButtonState.find({}, function (err, state) {
            res.send(state);
        });

    });

    app.post('/userLogin', urlencodedParser, function(req, res){

        UserAuth.findOne({username: req.body.username, password: req.body.password}, function(err, user){
            if(err) {
                console.log(err);
            }
            else if(user){
                res.redirect('/jknfkajdnffiuofadsftoday12123nkjnkkjn');
            }
            else {
                console.log('Invalid');
                console.log('UserID' + req.body.username);
                console.log('Password ' + req.body.password);
                res.redirect('/login');
            }
        });

    });

    app.post('/checkbox', urlencodedParser,function(req, res){

        console.log("checkbox!!!");
        console.log(req.body.state);
        ButtonState.findOneAndUpdate({_id:"58dfc4f9897ea15e28157611"}, {State: req.body.state}, function (err, place) {

        });
    });
};