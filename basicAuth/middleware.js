// var express = require('express');
// var router = express.Router();

async function firstMiddleware(req, res, next) {
    if (req.headers.authorization){
        console.log('there is header authorization');
        next();
    }else{
        console.log('there is NO header authorization');
        // res.status = 401;
        // res.text = 'Missing Authorization Header';
        // return res.send();
        res.sendStatus(401);
    }
};

module.exports = firstMiddleware;