var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'longasssqlpassword',
    database: 'cleandb'
});

connection.connect();

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log(req.query);
    var query = connection.query('INSERT INTO Event SET ?', req.query,
        function (err, rows) {
            res.send("err:" + err);
        });
});

module.exports = router;
