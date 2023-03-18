import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../../App';
import M from 'materialize-css';

function Reset() {
    // const { dispatch } = useContext(UserContext);
    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    const CheckData = async () => {
        const response = await fetch('/reset-password', {
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
            navigate("/login");

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
            </div>
        </>
    )
}

export default Reset