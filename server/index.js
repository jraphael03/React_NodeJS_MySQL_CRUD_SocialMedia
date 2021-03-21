const express = require('express');

const app = express()
const port = 5000;

// Import userRoute (routes/User.js)
const userRoute = require('./routes/User')
app.use('/user', userRoute);

app.listen(port, (req, res) => {
    console.log('Server running on port ' + port);
})