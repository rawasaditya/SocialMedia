import React from 'react'
import FeedCard from '../FeedCard/FeedCard'

const FeedList = ({ posts }) => {
    return <div className='flex flex-col gap-6 py-8'>{posts?.map(i => <FeedCard post={i} />)}</div>
}

export default FeedList