import React from 'react'
//Dialog box to create a new post
 const CreatePost = () => {
  return (
    <div className='card input-filed' style={{margin:"10px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}>
        <input tupe="text" placeholder='title'/>
        <input tupe="text" p laceholder='body'/>
        <div className='file-field input-field'>
            <div className="btn">
                <span>File</span>
                <input type='file'/>
            </div>
            <div className="file-path-wrapper">
                <input className='file-path validate' type="text"/>
            </div>
        </div>
        <button className="btn waves-effect waves-light" type="submit" name="action">Submit Post
        </button>
    </div>
  )
}
export default CreatePost
