const KitsModel = require('../models/gunplaModel.js');

const kitsController = {};

// Create a new kit
kitsController.createKit = async (req, res) => {
    try {
      console.log(req.body); // Check whether the request body is being received
      const kit = new KitsModel(req.body);
      console.log(kit); // Check whether the kit object is being created correctly
      await kit.save();
      console.log('Kit saved to database!'); // Check whether the kit is being saved to the database
      res.status(201).json(kit);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

kitsController.getAllKits = async (req, res) => {
    try {
      const kits = await KitsModel.find();
      res.json(kits);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  kitsController.getKitByName = async (req, res) => {
    try {
      const kit = await KitsModel.findOne({ kit: req.params.kit });
      if (!kit) {
        return res.status(404).json({ message: 'Kit not found' });
      }
      res.json(kit);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = kitsController;