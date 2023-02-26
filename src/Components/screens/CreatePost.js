import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";

// Require the cloudinary library
// const cloudinary = require('cloudinary');
// cloudinary.config({ 
//   cloud_name: 'ycloud', 
//   api_key: '614353156711494', 
//   api_secret: '0695vvsfBs2PEWw77rCa2_TknTs' ,
// });
// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });
// Log the configuration

// console.log(cloudinary.config());
// const uploadImage = async (imagePath) => {
//   // Use the uploaded file's name as the asset's public ID and 
//   try {
//     // Upload the image
//     const result = await cloudinary.v2.uploader.upload(imagePath);
//     console.log(result);
//     return result.public_id;
//   } catch (error) {
//     console.error(error);
//   }
// };


// const createImageTag = (publicId) => {

//   // Create an image tag with transformations applied to the src URL
//   let imageTag = cloudinary.image(publicId);

//   return imageTag;
// };

//Dialog box to create a new post
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  var [url, setUrl] = useState("");
  let navigate = useNavigate();


  // const publicId = await uploadImage(image);
  // Create an image tag, using two of the colors in a transformation
  // const imageTag = await createImageTag(publicId);
  // // Log the image tag to the console
  // console.log(imageTag);
  // };
  // await cloudinary.v2.uploader.upload(data)

  const postDetails = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ig-clone");//ig-clone
    data.append("cloud_name", "ycloud");//ycloud

    //uploading image to cloudinary
    await fetch("https://api.cloudinary.com/v1_1/ycloud/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const newurl = data.url;
        url = newurl;
        console.log(url);
      })
      .catch((err) => {
        console.log(err);
      });
    
    //uploading data to database
    let response = await fetch("http://localhost:5000/routes/post/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title,
        body,
        pic: url,
      }),
    });
    let json = await response.json();
    if (json) {
      M.toast({ html: "Success", classes: "#43a047 green darken-1" });
      navigate("/");
    } else {
      console.log(json.error);
      M.toast({
        html: "Something Went Wrong AF",
        classes: "#c62828 red darken-1",
      });
    }
  };

  return (
    <div
      className="card input-filed"
      style={{
        margin: "10px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />
      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light"
        type="submit"
        name="action"
        onClick={() => {
          postDetails();
        }}
      >
        Submit Post
      </button>
    </div>
  );
};
export default CreatePost;
