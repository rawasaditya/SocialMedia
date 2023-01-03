import Link from 'next/link';
import React, { useState, useContext } from 'react'
import { FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa'
import { AiTwotoneDelete } from 'react-icons/ai'
import { formatDistance } from 'date-fns'
import API from '../../../api';
import { AppContext } from '../../../context';

const FeedCard = ({ post }) => {
    const [like, setLike] = useState(false);
    const [context, setContext] = useContext(AppContext);
    const likeUnlike = (flag) => {
        API.post('likeunlike', {
            likeUnlike: flag
        })
            .then(resp => {
                console.log(resp);
            })
    }
    return (
        <><div className="card overflow-hidden lg:card-side bg-slate-100 shadow-xl  bgCust object-center">
            <div className='card-header block md:hidden p-2'>
                <div className='flex items-center align-middle gap-1'>
                    <Link href={`profile/${post.postedBy._id}`}>
                        <div className="avatar">
                            <div className="w-10 rounded-full border">
                                <img src="/sitelevel/avataaars.png" />
                            </div>
                        </div>
                    </Link>
                    <span className='text-sm flex flex-col'>{post.postedBy.username}
                        <span className='text-xs'>{formatDistance(new Date(), new Date(post.createdAt), { addSuffix: true })}</span>
                    </span>
                </div>
            </div>
            <figure className='md:w-96 border-r border-slate-700'><img src={`${process.env.NEXT_PUBLIC_API}/posts/${post.image}`} alt="Album" className='max-h-96 ' /></figure>
            <div className="card-body pb-0 pt-5">
                <div className='card-header hidden md:block'>
                    <div className='flex items-center align-middle gap-1 justify-end'>
                        <Link href={`profile/${post.postedBy._id}`}>
                            <div className="avatar">
                                <div className="w-10 rounded-full border">
                                    <img src="/sitelevel/avataaars.png" />
                                </div>
                            </div>
                        </Link>
                        <span className='text-sm flex flex-col'>{post.postedBy.username}
                            <span className='text-xs'>{formatDistance(new Date(), new Date(post.createdAt), { addSuffix: true })}</span>
                        </span>
                    </div>
                </div>
                <h2 className="card-title">{post.title}</h2>
                <p>{post.caption}</p>
                <div className="flex justify-around py-4 border-t border-slate-700">
                    {
                        like ? <FaHeart size={25} onClick={() => likeUnlike(true)} className="cursor-pointer fill-red-500" /> : <FaRegHeart size={25} onClick={() => likeUnlike(false)} className="cursor-pointer" />
                    }
                    <FaRegComment size={25} />
                    {
                        post.postedBy._id === context?.user?._id ? <AiTwotoneDelete size={25} className="hover:fill-red-500 cursor-pointer" /> : ''
                    }
                </div>
            </div>

        </div></>
    )
}

export default FeedCard