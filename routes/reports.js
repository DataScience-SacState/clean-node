var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'longasssqlpassword',
    database : 'cleandb'
});

connection.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var query = connection.query('SELECT * FROM Event', function (err, rows) {
        res.send(rows);
    });
});

module.exports = router;
