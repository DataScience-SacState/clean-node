var express = require('express');
var router = express.Router();

var http = require('http');
var request = require("request")

var url = "http://45.55.231.68:8000/cluster";
function getClusters(callback) {

    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(body) // Print the json response
            callback(body);
        }
    })

}


/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log(":3");
    getClusters(function(data){res.send(data);});
});

module.exports = router;
