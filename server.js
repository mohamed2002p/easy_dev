const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser")
const User = require("./src/route/userRoute");
const cors = require('cors'); // Import the cors middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'src/asset')));
const port = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve your application at the root URL
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/asset/home.html'));
});


app.use("/",User);
 
app.listen(port, '192.168.1.115', () => {
  console.log(`Server running on port ${port}`);
});
