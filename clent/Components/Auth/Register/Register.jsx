import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import API from '../../../api';
const Register = ({ setshowLogin }) => {
    const [username, setusername] = useState("");
    const [fistName, setfistName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const [confirmpassword,
        setconfirmpassword] = useState("");

    const resetForm = () => {
        setusername("");
        setfistName("");
        setlastName("");
        setemail("");
        setpassword("");
        setconfirmpassword("");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let passnotmatch = false;
        let passcriterianotmatch = false;
        if (password.match(/[a-z]/g) && password.match(
            /[A-Z]/g) && password.match(
                /[0-9]/g) && password.match(
                    /[^a-zA-Z\d]/g) && password.length >= 8) {

        } else {
            passcriterianotmatch = true;
        }
        if (password !== confirmpassword) {
            passnotmatch = true;
        }

        if (passnotmatch) {
            toast.error("Password and Confirm password does not match", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
        if (passcriterianotmatch) {
            toast.error(<><h2 className="mb-2 font-semibold text-red-500 dark:text-white">Password requirements:</h2>
                <ul className="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400 text-sm" >
                    <li>At least 1 uppercase character.</li>
                    <li>At least 1 lowercase character.</li>
                    <li>At least 1 digit.</li>
                    <li>At least 1 special character.</li>
                    <li>Minimum 8 characters.</li>
                </ul ></>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                icon: false
            });
        }

        if (passnotmatch || passcriterianotmatch) return;

        setloading(true);
        API.post("register", {
            username,
            password,
            email,
            fistName,
            lastName
        }).then((res) => {
            if (res.statusText === 'OK') {
                toast.success("Congratulations.!!. You can now login 🔥", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                resetForm();
                setshowLogin(true);
                setloading(false);

            }
        }).catch(err => {
            setloading(false);
            toast.error(err.response.data.message || err.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        });
    }


    return (

        <form onSubmit={submitHandler}>

            <div className="card-body">
                <div className="form-control w-full max-w-xs">
                    <input autoComplete='off' type="text" required value={fistName} onChange={e => setfistName(e.target.value)} placeholder="First Name" className="input input-md input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <input autoComplete='off' type="text" required value={lastName} onChange={e => setlastName(e.target.value)} placeholder="Last Name" className="input input-md input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <input autoComplete='off' type="email" required value={email} onChange={e => setemail(e.target.value)} placeholder="Email address" className="input input-md input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <input autoComplete='off' type="text" required value={username} onChange={e => setusername(e.target.value)} placeholder="Username" className="input input-md input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <input autoComplete='off' type="password" required value={password} onChange={e => setpassword(e.target.value)} placeholder="password" className="input input-md input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <input autoComplete='off' type="password" required value={confirmpassword} onChange={e => setconfirmpassword(e.target.value)} placeholder="confirm password" className={`input input-md input-bordered w-full max-w-xs`} />
                </div>
                <button className={`btn btn-sm btn-block ${loading ? 'loading disabled' : ''}`}>Register</button>
            </div>
        </form>

    )
}

export default Register