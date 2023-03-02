const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models/db.js');
const kitsController = require('./controllers/kitsController.js');
const buildsController = require('./controllers/buildsController.js');

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

const kitsRouter = express.Router();
app.use('/kits', kitsRouter);

kitsRouter.post('/', kitsController.createKit);
kitsRouter.get('/', kitsController.getAllKits);
kitsRouter.get('/:kit', kitsController.getKitsByName);
kitsRouter.get('/grade/:grade', kitsController.getKitsByGrade);


const buildsRouter = express.Router();
app.use('/builds', buildsRouter);

buildsRouter.post('/tobuild', buildsController.addToBuild);
buildsRouter.get('/', buildsController.getAllBuilds);
buildsRouter.delete('/:id', buildsController.deleteBuild);

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