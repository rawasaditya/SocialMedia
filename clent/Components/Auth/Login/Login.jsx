import React, { useState, useContext } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../../../context'
import API from '../../../api';
const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const [context, setContext] = useContext(AppContext)
    const resetForm = () => {
        setusername("");
        setpassword("");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setloading(true);
        API.post(`login`, {
            username,
            password,
        }).then(resp => {
            setloading(false);
            setContext(prev => ({ ...prev, user: resp.data.response.user }));
            window.localStorage.setItem("user", JSON.stringify(context));
            resetForm();
            toast.success(resp?.data?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        })
            .catch(err => {
                setloading(false);
                toast.error(err?.response?.data?.message || err.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            })
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="card-body">
                <div className="form-control w-full max-w-xs">
                    <input required value={username} onChange={e => setusername(e.target.value)} type="text" placeholder="Username" className="input input-md input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <input required value={password} onChange={e => setpassword(e.target.value)} type="password" placeholder="password" className="input input-md input-bordered w-full max-w-xs" />
                </div>
                <button className={`btn btn-sm btn-block ${loading ? 'loading disabled' : ''}`}>Login</button>

            </div >
        </form >
    )
}

export default Login