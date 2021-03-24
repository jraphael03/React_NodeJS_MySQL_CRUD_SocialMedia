const express = require('express');
const router = express.Router()

// Access db from config
const db = require("../config/db")

// Post from Register page
router.post('/register', (req, res) => { 
    const username = req.body.username;
    const password = req.body.password;       // localhost:5000/user/register
    db.
    query(
        "INSERT INTO users (username, password) VALUES (?, ?);", [username, password],
        (err, results) => {
        console.log(err);
        res.send(results);
        }
    );
});


// Post from Login page
router.post('/login', (req, res) => {       // localhost:5000/user/login
    const username = req.body.username;
    const password = req.body.password;
    db.
    query(
        "SELECT * FROM users WHERE username = ?",
        username,
        (err, results) => {
            if(err){
                console.log(err);
            }
            if(results.length > 0){         
                //console.log(results[0]);
                if(password == results[0].password){
                  //res.send('You are logged in');
                  res.json({ loggedIn: true, username: username });
                }else{
                  //res.send('Wrong username/password combination')
                  res.json({
                    loggedIn: false,
                    message: "Wrong username/password combination",
                  });
                }
            }else{
                //res.send("User doesn't exist");
                res.json({ loggedIn: false, message: "User does not exist"})
            }
        }
    )
})


module.exports = router;






// Testing db connection        runs under router for the import above
// router.get('/register', (req,res) => {      // localhost:5000/user/register
//     db.query("INSERT INTO users (username, password) VALUES ('Justin', 'Password')", 
//         (err, results) => {
//             console.log(err);
//             res.send(results);
//         } 
//     );
// });