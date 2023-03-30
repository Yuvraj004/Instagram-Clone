import React, { useState, useEffect ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import UserContext from '../../App';
const updatePhoto = async () => {
    const [image, setImage] = useState("")
  const { state,dispatch} = useContext(UserContext)

    useEffect(() => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "ig-clone");//ig-clone
        data.append("cloud_name", "ycloud");//ycloud

        //uploading image to cloudinary
        fetch("https://api.cloudinary.com/v1_1/ycloud/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                fetch('/updatepic', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        pic: data.url
                    })
                }).then(res => {
                    let result =res.json();
                    M.toast({ html: "Photo Updated", classes: "#43a047 green darken-1" });
                    localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }));
                    dispatch({ type: "UPDATEPIC", payload: result.pic });
                })

            }, [image]);


        return (
            <div>
                <input
                    type="file"
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                    }}
                />

            </div>
        )
    })
};


export default updatePhoto