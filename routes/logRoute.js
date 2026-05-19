const router = require('express').Router();
const Log = require('../models/logModel');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  uploadMultiple,
} = require('../services/blobService');
// ADD LOG WITH IMAGES
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  try {
    const { siteId, workDone, workers, notes } = req.body;
    const imageUrls =
      await uploadMultiple(
        req.files,
        'logs',
      );
   // const imagePaths = req.files.map(file => file.path);
   // console.log(imagePaths);
    const log = await Log.create({
      siteId,
      userId: req.user.id,
      workDone,
      workers,
      notes,
      images: imageUrls,
    });

    res.json(log);
  } catch (err) {
    res.status(500).json({ msg: "Upload failed!" });
  }
  /*   if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const { siteId, workDone, workers, notes } = req.body;
    //const imagePaths = req.files.map(file => file.path);
    //console.log(imagePaths);
  
  
    const imageUrls =
      await uploadMultiple(
        req.files,
        'logs',
      );
    console.log('Received file:', req.file.path);
    console.log('Extra field:', req.body);
  
    const log = await Log.create({
      siteId,
      userId: req.user.id,
      workDone,
      workers,
      notes,
      images: req.file.path,
    });
  
    res.json(log, {
      message: 'File uploaded !',
      filename: req.file.filename
    }); */
});

// GET LOGS FOR A SITE
router.get('/:siteId', auth, async (req, res) => {
  const logs = await Log.find({ siteId: req.params.siteId })
    .sort({ createdAt: -1 });

  res.json(logs);
});

router.put('/:id', auth, upload.array('images', 5), async (req, res) => {
  try {
    const { workDone, workers, notes, existingImages } = req.body;

    const log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).json({ msg: "Log not found" });
    }

    // old images kept by user
    let keptImages = [];
    console.log(existingImages);
    if (existingImages) {
      keptImages = JSON.parse(existingImages);
    }

    // newly uploaded images
   // const newImages = req.files.map(file => file.path);
   const newImages =
      await uploadMultiple(
        req.files,
        'logs',
      );
 console.log(newImages);
    log.workDone = workDone;
    log.workers = workers;
    log.notes = notes;

    // combine old + new
    log.images = [...keptImages, ...newImages];

    await log.save();

    res.json(log);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Update failed here" });
  }
});

module.exports = router;
