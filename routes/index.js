var express = require('express');
var router = express.Router();
var react = require('react');
var ReactDOM = require('react-dom/server');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'HomeHUD' });
});

module.exports = router;