import React, { useState } from 'react'
import Login from './Login/Login';
import Register from './Register/Register';

const AuthCard = () => {
    const [showLogin, setshowLogin] = useState(true);
    return (
        <div className="card w-96 bg-base-100 shadow-xl border p-4">
            <div className="card-actions justify-end">
                <button className={`btn btn-sm ${showLogin ? "btn-primary" : 'btn-ghost'}`} onClick={() => setshowLogin(prev => !prev)}>Login</button>
                <button className={`btn btn-sm ${!showLogin ? "btn-primary" : 'btn-ghost'}`} onClick={() => setshowLogin(prev => !prev)}>Register</button>
            </div>
            {
                showLogin ? <Login setshowLogin={setshowLogin} /> : <Register setshowLogin={setshowLogin} />
            }
        </div>
    )
}

export default AuthCard