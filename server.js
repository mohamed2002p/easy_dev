const app = require("./app");
const db = require('./src/config/db');
const dotenv=require('dotenv');

dotenv.config({ path: './config.env' });
const port = 4000;

app.listen(port,'192.168.1.107',() => {
    console.log(`Server running on port ${port}`);
  });