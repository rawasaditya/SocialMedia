import React from 'react'
import UserRoutes from '../Components/Routes/UserRoutes'
const Home = () => {
    return (
        <UserRoutes>
            <div className='flex w-full'>
                <div className='w-full'>Feeds</div>
                <div className='border border-black w-1/2'>Suggestions</div>
            </div>
        </UserRoutes>
    )
}


export default Home

