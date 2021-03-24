const express = require("express");
const router = express.Router();

// Access db from config
const db = require("../config/db");

// Post from Cloudinary images that were uploaded
router.post("/", (req, res) => {
  // localhost:5000/user/register
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const username = req.body.author;

  db.query(
    "INSERT INTO uploads (title, description, image, author) VALUES (?, ?, ?, ?);",
    [title, description, image, author],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
});

// GET IMAGES FROM MySQL which were uploaded to CLOUDINARY DB
router.get("/", (req, res) => {
  db.query("SELECT * FROM uploads", (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

// GET POSTS BY USER
router.get("/byUser/:username", (req, res) => {
  const userName = req.params.username;

  db.query(
    "SELECT * FROM uploads WHERE author = ?",
    userName,     // Selecting all of the uploads from the user currently logged in
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    }
  );
});

// Post likes to like db
router.post("/like", (req, res) => {
  const userLiking = req.body.userLiking;
  const postId = req.body.postId;

  db.query(
    "INSERT INTO likes (userLiking, postId) VALUES (?, ?)",
    [userLiking, postId],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      db.query(
        "UPDATE uploads SET likes = likes + 2 WHERE id = ?",
        postId,
        (err, results2) => {
          res.send(results2);
        }
      );
    }
  );
});

module.exports = router;
