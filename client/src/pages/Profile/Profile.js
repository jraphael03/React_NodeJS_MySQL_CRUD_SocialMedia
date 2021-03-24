import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Image } from "cloudinary-react";
import './Profile.css'

function Profile() {

  const [yourUploads, setYourUploads] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/upload/byUser/${localStorage.getItem("username")}`, {     // Pass current username to the backend to GET parameter
      })
      .then((response) => {
        setYourUploads(response.data);
      });
  }, []);

  return (
    <div>
      <div className="profile">
        <h1>{localStorage.getItem("username")}</h1>
        {yourUploads.map((val, key) => {
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
                {val.likes}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
