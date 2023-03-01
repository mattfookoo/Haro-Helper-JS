const mongoose = require('mongoose');

const kitsSchema = new mongoose.Schema({
  grade: String,
  kit: String,
  price: Number,
  series: String,
  verka: Boolean,
  description: String,
  notes: String,
  // img: String
});

const KitsModel = mongoose.model('kits', kitsSchema);

module.exports = KitsModel;