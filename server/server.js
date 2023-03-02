const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models/db.js');
const kitsController = require('./controllers/kitsController.js');

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

const kitsRouter = express.Router();
app.use('/kits', kitsRouter);

// Create a kit in the database
kitsRouter.post('/', kitsController.createKit);

// Get all kits from the database
kitsRouter.get('/', kitsController.getAllKits);

//Lookup by Kit
kitsRouter.get('/:kit', kitsController.getKitsByName);

//Lookup by grade
kitsRouter.get('/:grade', kitsController.getKitsByGrade);


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