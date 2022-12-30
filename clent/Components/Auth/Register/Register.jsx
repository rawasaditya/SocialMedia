import React, { useState } from 'react'
import axios from 'axios';
const Register = () => {
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword,
        setconfirmpassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/register`, {
            username,
            password,
            email
        }).then((res) => {
            console.log(res)
        }).catch(err => {
            console.error(err.message)
            return (
                <div className="toast toast-top toast-start">
                    <div className="alert alert-info">
                        <div>
                            <span>New mail arrived.</span>
                        </div>
                    </div>
                    <div className="alert alert-success">
                        <div>
                            <span>Message sent successfully.</span>
                        </div>
                    </div>
                </div>
            )
        });
    }

    return (
        <form onSubmit={submitHandler}>

            <div className="card-body">
                <div class="form-control w-full max-w-xs">
                    <input autoComplete='off' type="email" required value={email} onChange={e => setemail(e.target.value)} placeholder="Email address" class="input input-md input-bordered w-full max-w-xs" />
                </div>
                <div class="form-control w-full max-w-xs">
                    <input autoComplete='off' type="text" required value={username} onChange={e => setusername(e.target.value)} placeholder="Username" class="input input-md input-bordered w-full max-w-xs" />
                </div>
                <div class="form-control w-full max-w-xs">
                    <input autoComplete='off' type="password" required value={password} onChange={e => setpassword(e.target.value)} placeholder="password" class="input input-md input-bordered w-full max-w-xs" />
                </div>
                <div class="form-control w-full max-w-xs">
                    <input autoComplete='off' type="password" required value={confirmpassword} onChange={e => setconfirmpassword(e.target.value)} placeholder="confirm password" class="input input-md input-bordered w-full max-w-xs" />
                </div>
                <button className='btn btn-sm btn-block'>Register</button>
            </div>
        </form>

    )
}

export default Register