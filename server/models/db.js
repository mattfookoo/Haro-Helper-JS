const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://matthewfukudome:ONgFu0RTxtP4tMEo@harocluster.mnl9m4q.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

module.exports = db;