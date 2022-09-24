var express = require('express');
var router = express.Router();
var amqp = require('amqplib/callback_api');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = 'hello';

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, function(msg)
    {
      // var str = str;
      // setTimeout(() => console.log(msg.content.toString() + 'was returned back'),0);

                      var NEWqueue = 'new2';
                      var NEWmsg = msg.content.toString() + ' was sent back'

                      channel.assertQueue(NEWqueue, {
                        durable: false
                      });

                      channel.sendToQueue(NEWqueue, Buffer.from(NEWmsg));
                      console.log(" [x] Sent %s", NEWmsg);
    },
    {
      noAck: true
    });
  });
});



module.exports = router;
