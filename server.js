require('dotenv').config();
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const upload = require('./middleware/upload');
const Log = require('./models/logModel');

const app = express();
const BLOB_READ_WRITE_TOKEN="vercel_blob_rw_ztwqODiTGGAPlTsK_fAp6f1pMUblAWnIFDkp3HK4mRqIR6S";
const uri = "mongodb://mic:abush1157@cluster0-shard-00-00.9bamq.mongodb.net:27017,cluster0-shard-00-01.9bamq.mongodb.net:27017,cluster0-shard-00-02.9bamq.mongodb.net:27017/?ssl=true&replicaSet=atlas-5twhn6-shard-0&authSource=admin&appName=Cluster0";
  //"mongodb+srv://mic:abush1157@cluster0.9bamq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(cors({
  origin: '*',

}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello from the backend server!</h1>');
});


mongoose.connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("errer connecting:"+ err));

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
