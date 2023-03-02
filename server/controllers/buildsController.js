const ToBuildModel = require('../models/toBuildModel.js');

const buildsController = {};


buildsController.getAllBuilds = async (req, res) => {
    try {
        console.log('Fetching all builds from database');
        const kits = await ToBuildModel.find();
        console.log(`Found ${kits.length} kits`);
        res.json(kits);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    };


buildsController.addToBuild = async (req, res) => {
    try {
        const kitId = req.body.kitId;
        const toBuild = new ToBuildModel({ 
          kit: req.body.kit,
          grade: req.body.grade,
          price: req.body.price,
          series: req.body.series,
          verka: req.body.verka,
          completed: false, // set completed to false
          createdAt: new Date() // set createdAt to current date
        });
        await toBuild.save();
        console.log('Kit added to toBuild collection!');
        res.status(201).json(toBuild);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    };

    buildsController.updateBuild = async (req, res) => {
      try {
        const kitId = req.params.id;
        const updateFields = req.body;
        const updatedBuild = await ToBuildModel.findByIdAndUpdate(kitId, updateFields, { new: true });
        console.log('Kit updated in toBuild collection!');
        res.status(200).json(updatedBuild);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    };
    
    buildsController.deleteBuild = async (req, res) => {
      try {
        const kitId = req.params.id;
        await ToBuildModel.findByIdAndDelete(kitId);
        console.log('Kit deleted from toBuild collection!');
        res.status(204).end();
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    };
    
  module.exports = buildsController;
