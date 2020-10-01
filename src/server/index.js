var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
const axios = require("axios");
var cors = require('cors')
const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})


let projectData ={};
// runs the function when post test is called from client
app.post('/postData',function (req,res){
    console.log(10)
    console.log(projectData);
   // projectData.destination= req.body.destination;
   // projectData.from=req.body.from;
   // projectData.name=req.body.name;
   //  projectData.temperature = req.body.temperature;
   //  projectData.weather_condition = req.body.weather_condition;
   //  projectData.cityImage = req.body.cityImage;
   //  projectData.weatherIcon = req.body.weather.icon;
   projectData.ingredients = req.body.ingredients;
   projectData.number = req.body.number;
   projectData.cuisine = req.body.cuisine; 
   allData.sourceUrl = req.body.sourceUrl;
   allData.accounting= foodData.accounting
   allData.title = req.body.title;
   allData.summary = req.body.summary;
   allData.title = req.body.title;
   allData.image = req.body.image;
   res.send(projectData);
});

// designates what port the app will listen to for incoming requests
var server = app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})
module.exports = server;
