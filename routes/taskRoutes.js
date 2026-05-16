const router = require('express').Router();

const Task = require('../models/Task');
const auth = require('../middleware/auth');


// CREATE TASK
router.post('/', auth, async (req, res) => {
  try {

    const task = await Task.create(req.body);

    res.json(task);

  } catch (err) {

    res.status(500).json({
      msg: "Failed to create task"
    });

  }
});


// GET TASKS BY SITE
router.get('/:siteId', auth, async (req, res) => {

  const tasks = await Task.find({
    siteId: req.params.siteId,
  }).sort({ createdAt: -1 });

  res.json(tasks);

});


// UPDATE TASK
router.put('/:id', auth, async (req, res) => {

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);

});


// DELETE TASK
router.delete('/:id', auth, async (req, res) => {

  await Task.findByIdAndDelete(req.params.id);

  res.json({
    msg: "Task deleted"
  });

});

module.exports = router;
