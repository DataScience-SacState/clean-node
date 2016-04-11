var express = require('express');
var datetime = require('node-datetime');
var mysql = require('mysql');

var router = express.Router();
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
    var dt = datetime.create();
    var curTime = dt.format('Y.m.d.H.M.S');
    connection.query('UPDATE Event SET timeCompleted=? WHERE id=?', curTime, req.query.id,
        function (err, rows) {
            if (err == null)
                return "200";
            res.send("err:" + err);
        });
});

module.exports = router;
