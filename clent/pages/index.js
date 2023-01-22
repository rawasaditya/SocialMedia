import React from 'react'
import Feeds from '../Components/Feeds/Feeds'
import UserRoutes from '../Components/Routes/UserRoutes'
import Suggestions from '../Components/Suggestions/Suggestions'
const Home = () => {
    return (
        <UserRoutes>
            <div className='w-full'><Feeds /></div>
            <div className='hidden w-1/2 md:block'>
                <Suggestions />
            </div>
        </UserRoutes>
    )
}


export default Home

