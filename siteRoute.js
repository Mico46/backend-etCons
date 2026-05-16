const router = require('express').Router();
const Site = require('../models/siteModel');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const site = await Site.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(site);
});

router.get('/', auth, async (req, res) => {
  const sites = await Site.find({ userId: req.user.id });
  res.json(sites);
});

module.exports = router;