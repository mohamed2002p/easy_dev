const express = require('express');
const bodyParser = require("body-parser")
const User = require("./src/route/userRoute");
const app = express();

app.use(bodyParser.json());
app.use("/",User);
 
module.exports = app;