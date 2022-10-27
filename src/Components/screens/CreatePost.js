import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css'
//Dialog box to create a new post
 const CreatePost = () => {
    const [title,setTitle]=useState('')
    const [body,setBody]=useState('')
    const [image,setImage]=useState('')
    const [url,setUrl]=useState('')
    let navigate = useNavigate();


    // useEffect(() => {
    //     if(localStorage.getItem('token')){
    //       postDetails();
    //     }
    //     else{
    //       navigate("/login")
    //     }
    //     //eslint-disable-next-line
    //   }, []);

    const postDetails =async()=>{
        const data= new FormData()
        data.append("file",image)
        data.append("upload_preset","ig-clone")
        data.append("cloud_name","ycloud")
        const dataResponse =await fetch("http://api.cloudinary.com/v1_1/ycloud/image/upload",{method:"post",
        body:data}).catch(err=>{console.log(err)})
        const jsonData=await dataResponse.json();
        if(jsonData){
            setUrl(jsonData.url)
        }
        else{
            console.log(jsonData.error)
        }
        const response =await fetch("http://localhost:5000/api/post/createpost",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({
                title,body,pic:url
            })
        })
        let json = await response.json();
        if(json){
            setUrl(json.url);
            console.log(`Bearer ${localStorage.getItem('token')}`);
            M.toast({html:"Success",classes:"#43a047 green darken-1"})
            navigate("/");
        }
        else{
            console.log(json.error)
            M.toast({html:"Something Went Wrong AF",classes:"#c62828 red darken-1"})
        }

    }

  return (
    <div className='card input-filed' style={{margin:"10px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}>
        <input type="text" placeholder='title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
        <input type="text" placeholder='body' value={body} onChange={(e)=>{setBody(e.target.value)}}/>
        <div className='file-field input-field'>
            <div className="btn">
                <span>File</span>
                <input type='file' onChange={(e)=>{setImage(e.target.files[0])}}/>
            </div>
            <div className="file-path-wrapper">
                <input className='file-path validate' type="text"/>
            </div>
        </div>
        <button className="btn waves-effect waves-light" type="submit" name="action" onClick={()=>{postDetails()}}>Submit Post
        </button>
    </div>
  )
}
export default CreatePost
