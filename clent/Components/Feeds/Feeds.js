import React, { useEffect, useState } from 'react'
import API from '../../api';
import FeedList from './FeedList/FeedList';

const Feeds = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        API.get('user-posts')
            .then(res => {
                setPosts(res.data)
            })
    }, []);
    return (
        <div className='p-4'>
            <h3>Your posts</h3>
            <FeedList posts={posts?.response} />

        </div>
    )
}

export default Feeds