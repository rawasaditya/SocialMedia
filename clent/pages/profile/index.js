import React from 'react'
import Feeds from '../../Components/Feeds/Feeds'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import UserRoutes from '../../Components/Routes/UserRoutes'

const profile = () => {
    return (
        <UserRoutes>
            <div className='w-full'>
                <ProfileCard />
                <Feeds />
            </div>
            <div className='hidden w-1/2 md:block'>Suggestions</div>
        </UserRoutes>
    )
}

export default profile