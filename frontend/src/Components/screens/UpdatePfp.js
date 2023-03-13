import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';

const updatePhoto = async() => {
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
            let newurl = data.url;
            setUrl(newurl);
            url = newurl;
            M.toast({ html: "Success", classes: "#43a047 green darken-1" });
            // navigate("/");
        })
        .catch((err) => {
            M.toast({
                html: "Something Went Wrong AF",
                classes: "#c62828 red darken-1",
            });
            console.log(err);
        });

    return(
        <div></div>
    )
}