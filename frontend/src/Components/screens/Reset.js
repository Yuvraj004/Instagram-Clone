import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../App';
import M from 'materialize-css';
import { Dna } from 'react-loader-spinner';
require("dotenv").config({ path: "./.env" });

function Reset() {
    // const { dispatch } = useContext(UserContext);
    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    const BACKEND_URI =`${process.env.REACT_APP_BACKEND_URI}`;
    let [loader, setLoader] = useState(true);
    // const [password, setPassword] = useState("")
    const CheckData = async () => {
        setLoader(true)
        const response = await fetch(`${BACKEND_URI}/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        const json = await response.json();
        if (json) {
            M.toast({ html: "Check your Email", classes: "#43a047 green darken-3" });
            console.log(json)
            //save the token and redirect
            setLoader(false)
            navigate("/signin");

        }
        else {
            M.toast({ html: "Retry Please", classes: "#c62828 red darken-3" });
        }
    }
    return (
        <>
            <div className='container'>
                <div className="login-box shadow">
                    <h2 className='loginh2'>Instagram</h2>
                    <input className='logininput' type="text" placeholder="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    <button className=" buttonlog" type="submit" name="action" onClick={() => CheckData()}>Reset Password
                    </button>
                </div>
                <Dna
                visible={loader}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
        </>
    )
}

export default Reset