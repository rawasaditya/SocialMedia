import React, { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify';
import API from '../../api'
import { AppContext } from '../../context';
const Suggestions = () => {
    const [toFollow, setToFollow] = useState([]);
    const [context, setContext] = useContext(AppContext);
    useEffect(() => {
        API.get('/find-people').
            then(res => {
                setToFollow(res.data.response)
            })
            .catch(e => {
                toast.error(e.message)
            })

    }, [toFollow.length]);

    const followUser = (id, e, follow) => {
        e.stopPropagation();
        API.post('follow-unFollow', {
            id: id,
            follow: follow
        })
            .then(res => {
                if (follow) {
                    setContext(prev => {
                        return {
                            ...prev,
                            user: {
                                ...prev.user,
                                following: [...prev.user.following, id]
                            }
                        }
                    });

                    setToFollow(prev => {
                        const newFollow = prev.filter(i => {
                            return i._id !== id
                        })
                        return newFollow
                    });
                } else {

                }

            }).catch(e => {
                toast.error(e.message);
            })
    }

    return (
        <div>
            <div className='py-14'>

                <ul className="p-2 rounded-box bgCust">
                    <h3 className='px-3 mb-2'>Suggestions</h3>
                    {
                        toFollow.length ? (
                            toFollow.map(i => <li className='py-3'>
                                <span className='flex items-center justify-between w-full align-middle '>
                                    <div className='flex gap-3'>
                                        <div className="avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={i.photo ? `${process.env.NEXT_PUBLIC_API}/users/${i.photo}` : "https://placeimg.com/192/192/people"} />
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-sm'>{i.firstName} {i.lastName}</span>
                                            <span className='text-xs'>{i.username}</span>
                                        </div>
                                    </div>
                                    <button className='text-xs btn btn-sm' onClick={(e) => followUser(i._id, e, true)}>
                                        {
                                            context?.user?.followers?.includes(i._id) ? "Follow Back" : "Follow"
                                        }
                                    </button>
                                </span>
                            </li>)
                        ) : <></>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Suggestions