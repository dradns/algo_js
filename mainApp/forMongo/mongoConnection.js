const mongoose = require('mongoose');

mongoose.connect('mongodb://specAdmin:specPassword@localhost:27017/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const mongooseConnection = mongoose.connection;
mongooseConnection.on('error', console.error.bind(console, 'connection error:'));
mongooseConnection.on('open', () => console.log('on OPEN'));

module.exports = mongoose;