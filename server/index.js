const express = require('express');
const cors = require("cors");

const app = express()
const port = 5000;

app.use(cors());
app.use(express.json());

// Import userRoute (routes/User.js)
const userRoute = require('./routes/User')      // localhost:5000/user
app.use('/user', userRoute);

const uploadRoute = require("./routes/Upload");     // localhost:5000/upload
app.use("/upload", uploadRoute);

app.listen(port, (req, res) => {
    console.log('Server running on port ' + port);
})