const express = require('express');
const router = express.Router()

// Access db from config
const db = require("../config/db")

// Testing db connection        runs under router for the import above
router.get('/register', (req,res) => {      // localhost:5000/user/register
    db.query("INSERT INTO users (username, password) VALUES ('Justin', 'Password')", 
        (err, results) => {
            console.log(err);
            res.send(results);
        } 
    );
});


module.exports = router;
