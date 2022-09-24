var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/some',function (req, res, next) {
    console.log(req.headers); next()},
    passport.authenticate('github', { scope: ['user:email'] }));

router.get('/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.log('WASSSSSSSAWASSSSSSSAWASSSSSSSAWASSSSSSSAWASSSSSSSAWASSSSSSSAWASSSSSSSAWASSSSSSSAWASSSSSSSAWASSSSSSSAWASSSSSSSAWASSSSSSSA');
        res.redirect('/users');
    });

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/logout', function(req, res, next) {
    console.log(req.session);
    req.session = null;
    req.logout();
    res.redirect('/kudato');
});

module.exports = router;
