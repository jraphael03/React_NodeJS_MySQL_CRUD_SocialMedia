import React, { useState } from "react";
import "./Upload.css";
import axios from "axios";
import { useHistory } from 'react-router-dom'

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  let history = useHistory();

  const upload = () => {
    const formData = new FormData(); // Created object named formData we can append objects to FormData
    formData.append("file", image[0]);
    formData.append("upload_preset", "socialMediaApp"); // Second part is grabbed from cloudinary settings enable uploading
    console.log(formData);

    axios
      .post(
        `https://api.cloudinary.com/v1_1/justinraphael/image/upload`,
        formData
      )
      .then((response) => {
        const fileName = response.data.public_id; // public_id is how we will be able to grab the image we uploaded

        axios.post("http://localhost:5000/upload", {
          title: title,
          description: description,
          image: fileName, // Get the filename from above
          author: localStorage.getItem("username")      // Grabs username from the backend
        }).then(() => {
            history.push('/')       // Redirect to homepage
        })
      });
  };

  return (
    <div className="upload">
      <h1>Create a Post</h1>
      <div className="uploadForm">
        <input
          type="text"
          placeholder="Title..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Description..."
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input type="file" onChange={(e) => setImage(e.target.files)} />
        <button onClick={upload}>Upload</button>
      </div>
    </div>
  );
}

export default Upload;
