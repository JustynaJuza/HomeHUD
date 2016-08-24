var express = require('express');
var router = express.Router();
var react = require('react');
var ReactDOM = require('react-dom/server');

// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

router.get('/', function (req, res) {
    res.render('index', { title: 'HomeHUD' });
});

router.get('/hello', function (req, res) {
  console.log('test')
    res.render('index', { title: 'HomeHUD' });
});

module.exports = router;
