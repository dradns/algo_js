const mongoose = require('./mongoConnection');

const linkScheme = new mongoose.Schema({longLink: String, shortLink: String});
const LinkInstance2 = mongoose.model('LinkInstance2', linkScheme);

module.exports = LinkInstance2;