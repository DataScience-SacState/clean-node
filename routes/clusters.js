var datetime = require('node-datetime');
var express = require('express');
var uuid = require('uuid');
var router = express.Router();
var _ = require('lodash');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'longasssqlpassword',
    database: 'cleandb'
});

connection.connect();

var validTypes = [
    "Graffiti",
    "Trees",
    "Illegal Dumping",
    "Pavement",
    "Traffic Sign Complaints",
    "Sweeper Request",
    "Stray Animals",
    "Abandoned Vehicles"
];

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log(req.query);
    //console.log(req);
    console.log(req.user);
    if (!req.query || req.query['id']
            || !req.query['latitude'] || !req.query['longitude'] || !req.query['reporter']
            || !req.query['description'] || !_.includes(validTypes, req.query['type'])
            ) {
        res.sendStatus(418);
        //next();
        return;
    }

    req.query.id = uuid.v4();
    //req.query.reporter = req.user['user_id'];

    if (!req.query['timeReported']) {
        req.query.timeReported = datetime.create().format('Y.m.d.H.M.S');
    }
    if (!req.query['timeCompleted']) {
        req.query.timeCompleted = null;
    }

    console.log(req.query);
    var query = connection.query('INSERT INTO Event SET ?', req.query,
        function (err, rows){
            if (err) {
                console.error(err);
                res.send(err);
                return;
            }
            //next();
            console.log("WEWLAD");
            res.send(req.query);
            return;
        });
});

module.exports = router;
