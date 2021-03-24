import React, { useState, useEffect } from "react";
import "./Home.css";
import { Image } from "cloudinary-react";
import axios from "axios";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

function Home() {
  const [uploads, setUploads] = useState([]);

  // Check if you are logged in
  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", false); // If there is no item called setItem in localStorage set it to false
    }
  }, []);

  // Request to the backend getting all of the posts that exist in the database
  useEffect(() => {
    axios.get("http://localhost:5000/upload").then((response) => {
      setUploads(response.data);
    });
  }, []);

    const likePost = (id, key) => {
      var tempLikes = uploads;
      tempLikes[key].likes = tempLikes[key].likes + 1;

      axios
        .post("http://localhost:5000/upload/like", {
          userLiking: localStorage.getItem("username"),
          postId: id,
        })
        .then((response) => {
          setUploads(tempLikes);
        });
    };

  return (
    <div className="home">
      {uploads.map((val, key) => {
        // This will go through the database and for each item it will create a post
        return (
          <div className="post">
            <div className="image">
              <Image cloudName="justinraphael" publicId={val.image} />
            </div>
            <div className="content">
              <div className="title">
                {val.title} / by @{val.author}
              </div>
              <div className="description">{val.description}</div>
            </div>
            <div className="engagement">
              <ThumbUpAltIcon
                id="likeButton"
                onClick={() => {
                  likePost(val.id, key);
                }}
              />
              {val.likes}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
