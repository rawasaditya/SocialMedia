import React, { useState } from 'react'

const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="card-body">

                <div class="form-control w-full max-w-xs">

                    <input required value={username} onChange={e => setusername(e.target.value)} type="text" placeholder="Username" class="input input-md input-bordered w-full max-w-xs" />

                </div>
                <div class="form-control w-full max-w-xs">

                    <input required value={password} onChange={e => setpassword(e.target.value)} type="password" placeholder="password" class="input input-md input-bordered w-full max-w-xs" />

                </div>
                <button className='btn btn-sm btn-block'>Login</button>
            </div>
        </form >
    )
}

export default Login