import React, { useEffect, useState } from 'react'
import API from '../../api';
import FeedList from './FeedList/FeedList';

const Feeds = ({ show }) => {
    const [posts, setPosts] = useState([]);
    const [feeds, setFeeds] = useState([]);
    useEffect(() => {
        API.get('user-posts')
            .then(res => {
                setPosts(res?.data)
            })


        API.get('feeds-posts')
            .then(res => {
                setFeeds(res?.data)
            })

    }, []);
    return (
        <div>
            {
                feeds?.response?.length ? <>
                    <h3>Feeds</h3>
                    <FeedList posts={feeds?.response} setPosts={setFeeds} /></> : null
            }

            {
                posts?.response?.length ? <>
                    <h3>Your posts</h3>
                    <FeedList posts={posts?.response} setPosts={setPosts} /></> : null
            }


        </div>
    )
}

export default Feeds