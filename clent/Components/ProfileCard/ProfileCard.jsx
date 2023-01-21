import React, { useContext, useState } from 'react'
import { AppContext } from '../../context';
import ProfileEditCard from './ProfileEditCard';
import { FiEdit2 } from 'react-icons/fi'

const ProfileCard = () => {
    const [context,
        setContext] = useContext(AppContext);
    const [edit, setedit] = useState(false);
    return (
        <>
            <div className='pb-8'>
                <h3 className='pb-8'>Your Profile</h3>

                {
                    !edit ? <div className="relative grid items-center flex-shrink-0 gap-4 p-4 py-8 shadow-xl rounded-box bgCust place-items-center xl:w-full">
                        <FiEdit2 className='absolute cursor-pointer top-5 right-5 hover:text-white' onClick={() => setedit(true)} />
                        <div><div className="online avatar">
                            <div className="h-24 mask mask-squircle bg-base-content bg-opacity-10 ">
                                <img src={context?.user?.photo ? `${process.env.NEXT_PUBLIC_API}/users/${context?.user?.photo}` : 'https://daisyui.com/tailwind-css-component-profile-1@94w.jpg'} width="94" height="94" alt="Avatar Tailwind CSS Component" className="mask mask-squircle" />
                            </div>
                        </div>
                        </div>
                        <div className="w-full">
                            <div >
                                <div tabIndex="0">
                                    <div className="text-center">
                                        <div className="text-lg font-extrabold">{context?.user?.firstName} {context?.user?.lastName}</div>
                                        <div className="text-sm">{context?.user?.about}</div>
                                    </div></div>
                                <div className='flex pt-9 justify-evenly'>
                                    <div className='flex flex-col items-center justify-center align-middle'>
                                        <span className='text-2xl text-white'>{context?.user?.followers?.length || 0}</span>
                                        <span className='text-sm uppercase'>Followers</span>
                                    </div>
                                    <div className='flex flex-col items-center justify-center align-middle'>
                                        <span className='text-2xl text-white'>{context?.user?.following?.length || 0}</span>
                                        <span className='text-sm uppercase'>Followings</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                        : <ProfileEditCard
                            context={context}
                            setContext={setContext}
                            edit={edit}
                            setedit={setedit}
                        />
                }
            </div>

        </>

    )


}

export default ProfileCard