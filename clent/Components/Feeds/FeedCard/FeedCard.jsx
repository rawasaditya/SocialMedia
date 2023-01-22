import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa'
import { AiTwotoneDelete } from 'react-icons/ai'
import { formatDistance } from 'date-fns'
import API from '../../../api';

const FeedCard = ({ post, user, setPosts }) => {
    const [like, setLike] = useState(false);
    const likeUnlike = (flag, post) => {
        API.post('likeunlike', {
            likeUnlike: flag,
            post
        }).then(resp => {
            if (resp.status === 200) {
                setLike(flag)
            }
        })
    }

    const deletePost = () => {
        API.post('deletePost', {
            id: post._id
        })
            .then(res => {
                setPosts(prev => {
                    const filtered = prev?.response?.map(i => {
                        if (i._id !== res.data.response._id) {
                            return i
                        }
                    });
                    return { response: filtered, ...prev }

                })
            })
    }

    useEffect(() => {
        setLike(post.likes.includes(user?.user?._id))
    }, []);
    return (
        <><div className="object-center overflow-hidden shadow-xl card lg:card-side bg-slate-100 bgCust">
            <div className='block p-2 card-header md:hidden'>
                <div className='flex items-center gap-1 align-middle'>
                    <Link href={`profile/${post.postedBy._id}`}>
                        <div className="avatar">
                            <div className="w-10 border rounded-full">
                                <img src="/sitelevel/avataaars.png" />
                            </div>
                        </div>
                    </Link>
                    <span className='flex flex-col text-sm'>{post.postedBy.username}
                        <span className='text-xs'>{formatDistance(new Date(), new Date(post.createdAt))}</span>
                    </span>
                </div>
            </div>
            <figure className='border-r md:w-96 border-slate-700'><img src={`${process.env.NEXT_PUBLIC_API}/posts/${post.image}`} alt="Album" className='max-h-96 ' /></figure>
            <div className="pt-5 pb-0 card-body">
                <div className='hidden card-header md:block'>
                    <div className='flex items-center justify-end gap-1 align-middle'>
                        <Link href={`profile/${post.postedBy._id}`}>
                            <div className="avatar">
                                <div className="w-10 border rounded-full">
                                    <img src="/sitelevel/avataaars.png" />
                                </div>
                            </div>
                        </Link>
                        <span className='flex flex-col text-sm'>{post.postedBy.username}
                            <span className='text-xs'>{formatDistance(new Date(), new Date(post.createdAt), { addSuffix: true })}</span>
                        </span>
                    </div>
                </div>
                <h2 className="card-title">{post.title}</h2>
                <p>{post.caption}</p>
                <div className="flex justify-around py-4 border-t border-slate-700">
                    {
                        like ? <FaHeart size={25} onClick={() => likeUnlike(false, post._id)} className="cursor-pointer fill-red-500" /> : <FaRegHeart size={25} onClick={() => likeUnlike(true, post._id)} className="cursor-pointer" />
                    }
                    <FaRegComment size={25} />
                    {
                        post.postedBy._id === user.user?._id ? <AiTwotoneDelete size={25} className="cursor-pointer hover:fill-red-500" onClick={deletePost} /> : ''
                    }
                </div>
            </div>

        </div></>
    )
}

export default FeedCard