import React, { useState, useRef } from 'react'
import { FaTimes, FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify';
import API from '../../api';

const ProfileEditCard = (
    {
        context,
        setContext,
        edit,
        setedit
    }
) => {
    const [fname, setFname] = useState(context?.user?.firstName);
    const [lname, setLname] = useState(context?.user?.lastName);
    const [about, setAbout] = useState(context?.user?.about);
    const [previewImage, setPreviewImage] = useState(context?.user?.photo ? `${process.env.NEXT_PUBLIC_API}/users/${context?.user?.photo}` : 'https://daisyui.com/tailwind-css-component-profile-1@94w.jpg');


    const [image, setImage] = useState("");
    const filePicker = useRef();
    const previewFile = (e) => {
        const reader = new FileReader();
        const selectedFile = e.target.files[0];
        setImage(selectedFile)
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
        reader.onload = (readerEvent) => {
            setPreviewImage(readerEvent.target.result);
        };
    }
    const saveProfile = () => {
        const formdata = new FormData();
        formdata.append('firstName', fname)
        formdata.append('lastName', lname)
        formdata.append('about', about)
        formdata.append('photo', image)

        API.post('updateUser', formdata, {
            headers: { 'content-type': 'multipart/form-data' }
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Updated");
                    setContext(prev => ({ ...prev, user: res.data.response }));
                } else {
                    toast.error(res.data.message);

                }
            })
    }
    return (
        <div className="relative grid items-center flex-shrink-0 gap-4 p-4 py-8 shadow-xl rounded-box bgCust place-items-center xl:w-full ">

            <FaTimes className='absolute cursor-pointer top-5 right-10 hover:text-white' onClick={() => setedit(false)} />
            <FaSave className='absolute cursor-pointer top-5 right-5 hover:text-white' onClick={saveProfile} />

            <div><div className="avatar">
                <div className="h-24 mask mask-squircle bg-base-content bg-opacity-10 ">
                    <label>
                        <img src={previewImage} width="94" height="94" alt="Avatar Tailwind CSS Component" className="mask mask-squircle" />
                        <input type="file" ref={filePicker} className='hidden' onChange={previewFile} />
                    </label>
                </div>
            </div>
            </div>
            <div className="w-full">
                <div >
                    <div tabIndex="0">
                        <div className="text-center">
                            <div className="flex justify-center mb-2 text-lg font-extrabold">
                                <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} className="w-full max-w-xs input input-ghost input-sm" />
                                <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} className="w-full max-w-xs input input-ghost input-sm" /></div>
                            <textarea className="text-sm textarea textarea-ghost" onChange={(e) => setAbout(e.target.value)}>{about}</textarea>

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
    )
}

export default ProfileEditCard