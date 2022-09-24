var express = require('express');
var router = express.Router();
var amqp = require('amqplib/callback_api');

/* GET home page. */
router.get('/', function(req, res, next) {

        for (let i = 0; i < 1 ;i++) {
                amqp.connect('amqp://localhost', function (error0, connection) {
                  if (error0) {
                    throw error0;
                  }
                  connection.createChannel(function (error1, channel) {
                    if (error1) {
                      throw error1;
                    }
                    var queue = 'hello';
                    var msg = 'Hello world from requester'+ i;

                    channel.assertQueue(queue, {
                      durable: false
                    });

                    channel.sendToQueue(queue, Buffer.from(msg));
                    console.log(" [x] Sent %s", msg);
                  });
                });
        }
  res.render('index', { title: 'Express' });
});

module.exports = router;
