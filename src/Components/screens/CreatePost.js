import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";

// Require the cloudinary library
// var cloudinary = require('cloudinary').v2;

// cloudinary.config({ 
//   cloud_name: 'ycloud', 
//   api_key: '614353156711494', 
//   api_secret: '0695vvsfBs2PEWw77rCa2_TknTs' ,
//   secure: true
// });
// // Log the configuration
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


// Gets details of an uploaded image
// const getAssetInfo = async (publicId) => {
  
//   // Return colors in the response
//   const options = {
//     colors: true,
//   };
  
//   try {
//       // Get details about the asset
//       const result = await cloudinary.api.resource(publicId, options);
//       console.log(result);
//       return result.colors;
//       } catch (error) {
//       console.error(error);
//   }
// };


// const createImageTag = (publicId, ...colors) => {
      
//   // Set the effect color and background color
//   const [effectColor, backgroundColor] = colors;
  
//   // Create an image tag with transformations applied to the src URL
//   let imageTag = cloudinary.image(publicId, {
//     transformation: [
//       { gravity: 'faces', crop: 'thumb' },
//       { radius: 'max' },
//       { effect: 'outline:10', color: effectColor },
//       { background: backgroundColor },
//     ],
//   });
  
//   return imageTag;
// };

//Dialog box to create a new post
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  let navigate = useNavigate();

  useEffect( () => {
    if (localStorage.getItem("token")) {
      // const publicId = await uploadImage("./image.jpg");
      
      // // Get the colors in the image
      // const colors = await getAssetInfo(publicId);
      
      // // Create an image tag, using two of the colors in a transformation
      // const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);
      
      // // Log the image tag to the console
      // console.log(imageTag);
      postDetails();
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  const postDetails = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ig-clone");//ig-clone
    data.append("cloud_name", "ycloud");//ycloud
    // await cloudinary.v2.uploader.upload(data)
    await fetch("https://api.cloudinary.com/v1_1/ycloud/auto/upload", {
      method: "post",
      body: data,
      request:'no-cors'
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
      // try {
      //   // Upload the image
      //   const result = await cloudinary.v2.uploader.upload(data);
      //   console.log(result);
      //   setUrl(result.url);
      //   return result.public_id;
      // } catch (error) {
      //   console.error(error);
      // }
    let response = await fetch("http://localhost:5000/routes/post/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`,
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
