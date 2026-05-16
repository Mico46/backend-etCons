const router = require('express').Router();
const { register, login } = require('../controllers/auth');

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ msg: "Password too short" });
  }

  next();
}, register);

// LOGIN
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    //console.log("email:"+email);
    return res.status(400).json({ msg: "Missing credentials" });
  }

  next();
}, login);

module.exports = router;
