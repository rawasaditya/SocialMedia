import React, { useState, useEffect } from 'react'
import API from '../../api'
import FeedList from '../../Components/Feeds/FeedList/FeedList'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import UserRoutes from '../../Components/Routes/UserRoutes'
import Suggestions from '../../Components/Suggestions/Suggestions'

const profile = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        API.get('user-posts')
            .then(res => {
                setPosts(res?.data)
            })



    }, []);
    return (
        <UserRoutes>
            <div className='w-full'>
                <ProfileCard />
                <div>
                    <h3>Your posts</h3>
                    <FeedList posts={posts?.response} setPosts={setPosts} />
                </div>
            </div>
            <div className='hidden w-1/2 md:block'>
                <Suggestions />
            </div>
        </UserRoutes>
    )
}

export default profile