const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require('node:dns');
const os = require('node:os');

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const uri = "mongodb://mic:abush1157@cluster0-shard-00-00.9bamq.mongodb.net:27017,cluster0-shard-00-01.9bamq.mongodb.net:27017,cluster0-shard-00-02.9bamq.mongodb.net:27017/?ssl=true&replicaSet=atlas-5twhn6-shard-0&authSource=admin&appName=Cluster0"
 //"mongodb+srv://mic:abush1157@cluster0.9bamq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Routes
const orderRoutes = require("./routes/orderRoutes");
app.use("/api", orderRoutes);

app.get('/home', (req, res) => {
 const clientIp = req.ip; 
  res.send(`Your IP is: ${clientIp}`); 
  //console.log(clientIp);
});
// Connect DB
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log('The error: '+ err));

// Start server
const PORT = process.env.PORT || 5000;
//const ip = require("ip");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`host:`);
  
});
app.use(express.urlencoded({ extended: true }));
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes); 