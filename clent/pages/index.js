import React from 'react'
import Feeds from '../Components/Feeds/Feeds'
import UserRoutes from '../Components/Routes/UserRoutes'
const Home = () => {
    return (
        <UserRoutes>
            <div className='flex w-full h-screen overflow-y-auto feeds__suggestions'>
                <div className='w-full'><Feeds /></div>
                <div className=' w-1/2'>Suggestions</div>
            </div>
        </UserRoutes>
    )
}


export default Home

