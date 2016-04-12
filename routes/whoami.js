var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!req.user || !res.user['user_id'])
        res.send("IDK");

    res.send(req.user['user_id']);
});

module.exports = router;
