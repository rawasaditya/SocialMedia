import React, { useContext } from 'react'
import { AppContext } from '../../../context';
import FeedCard from '../FeedCard/FeedCard'

const FeedList = ({ posts, setPosts }) => {
    const [context, setContext] = useContext(AppContext);
    return <div className='flex flex-col gap-6 py-8'>{posts?.map(i => <FeedCard post={i} user={context} setPosts={setPosts} key={i._id} />)}</div>
}

export default FeedList