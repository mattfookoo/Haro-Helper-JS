const express = require('express');
const app = express();
const db = require('./src/server/models/db.js');
const kitsController = require('./src/server/controllers/kitsController.js');

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const kitsRouter = express.Router();
app.use('/kits', kitsRouter);

// Create a kit in the database
kitsRouter.post('/', kitsController.createKit);

// Get all kits from the database
kitsRouter.get('/', kitsController.getAllKits);

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

db.once('open', () => {
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
});