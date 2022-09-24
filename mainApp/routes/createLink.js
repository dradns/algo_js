const mongoose = require('../forMongo/mongoConnection');
const LinkInstance2 = require('../forMongo/linkScheme');
var express = require('express');
var encodedFunc = require('../utills/encodedFunc');
var router = express.Router();

router.post('/', async function(req, res, next) {
            if (req.body.link){
              const linkAlreadyInDb = await LinkInstance2.findOne({longLink: req.body.link});
              // console.log(linkAlreadyInDb);
              if(linkAlreadyInDb){
                res.status('209');
                return res.send(linkAlreadyInDb.shortLink);
              }else{
                await createLink(req.body.link, res);
              }
            }else{
                res.status('404');
                return res.send('noLink');
}});

router.get('/allInDb', async function(req, res, next) {
      console.log(await LinkInstance2.find());
});

module.exports = router;

async function createLink(linkFromBody, res){
  await LinkInstance2.create({ longLink: linkFromBody, shortLink: encodedFunc(linkFromBody)}, (err, line) => {
    if(err){
      console.log(err + ' its an error');
      res.status('420');
      res.json(err);
    }
    // console.log(line);
    return res.json(line);
  })
};

// function findLink (){
//
// };
