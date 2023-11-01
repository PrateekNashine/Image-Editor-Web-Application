const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/imageeditor");

const imageSchema = mongoose.Schema({
  name: String,
})

module.exports = mongoose.model('users', imageSchema);