import React, { useEffect, useContext, } from 'react'
import { useRouter } from 'next/router';
import AuthCard from '../Components/Auth/AuthCard'
import { AppContext } from '../context';

const Login = () => {
    const [context, setContext] = useContext(AppContext);
    const router = useRouter();
    useEffect(() => {
        if (context?.user?._id) {
            router.push("/")
        }
    }, [context]);
    return (
        <div className='flex justify-center  items-center h-full '>
            <AuthCard />
        </div>
    )
}

export default Login