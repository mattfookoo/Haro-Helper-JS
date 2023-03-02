const mongoose = require('mongoose');

const toBuildSchema = new mongoose.Schema({
    grade: String,
    kit: String,
    price: Number,
    series: String,
    verka: Boolean,
    completed: {
      type: Boolean,
      default: false
    }
  });
  
  const ToBuildModel = mongoose.model('toBuild', toBuildSchema);
  
  module.exports = ToBuildModel;