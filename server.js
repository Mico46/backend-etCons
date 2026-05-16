require('dotenv').config();
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const upload = require('./middleware/upload');
const Log = require('./models/logModel');

const app = express();

app.use(cors({
  origin: '*',

}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/sites', require('./routes/siteRoute'));
app.use('/api/logs', require('./routes/logRoute'));
app.use('/uploads', express.static('uploads'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use(
  '/api/expenses',
  require('./routes/expenseRoutes')
);

//const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const { siteId, workDone, workers, notes } = req.body;
  //const imagePaths = req.files.map(file => file.path);
  //console.log(imagePaths);
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
    message: 'File uploaded successfully!',
    filename: req.file.filename
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));