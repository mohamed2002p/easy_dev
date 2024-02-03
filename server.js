const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const app = express();
const bodyParser = require("body-parser")
const User = require("./src/route/userRoute");
const cors = require('cors'); 
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));
const port = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB = require ('./src/config/db')
connectDB()
// // Serve your application at the root URL
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'src/asset/home.html'));
// });
app.use("/",User);
module.exports.handler = serverless(app);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
