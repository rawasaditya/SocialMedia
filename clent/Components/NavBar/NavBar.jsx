import React, { useContext, useState } from 'react'
import { FiHome, FiSearch, FiCompass, FiLogIn, FiPlusSquare, FiLogOut, FiUser } from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from "next/router";
import { AppContext } from '../../context'
import API from '../../api';
import PostForm from '../PostForm/PostForm';
import { toast } from 'react-toastify';
const NavBar = () => {
  const [context, setContext] = useContext(AppContext)
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [previewImage, setPreviewImage] = useState("/sitelevel/uploadimage.png");
  const [loading, setLoading] = useState("");
  const router = useRouter();
  const logout = () => {
    API.get('logout')
      .then(res => {
        router.push("/login")
        setContext(prev => ({ ...prev, user: null }));
      })
  }

  const postPicture = (e) => {
    if ([image?.name?.length, title.length, caption.length].includes(undefined) || [image?.name?.length, title.length, caption.length].includes(0)) {
      toast.error(`${image?.name?.length ? "" : "Image"} ${title.length ? "" : "Title"} ${caption.length ? "" : "Caption"} is required`);
      return;
    }
    setLoading('loading disabled');
    const formdata = new FormData();
    formdata.append('image', image);
    formdata.append('title', title);
    formdata.append('caption', caption);
    API.post('uploadpost', formdata, {
      headers: { 'content-type': 'multipart/form-data' }
    })
      .then(res => {
        if (res.status === 200) {
          toast.success("Post saved successfully");
          resetForm();
          setLoading('');
          // router.push("/");
          // location.reload();
        } else {
          throw res;
        }
      })
      .catch(err => {
        console.log(err)
        setLoading('');

      })
  }


  const resetForm = () => {
    setCaption("");
    setImage(null);
    setTitle("");
    setPreviewImage("/sitelevel/uploadimage.png");
    return;
  }

  return (
    <>
      {/* The button to open modal */}


      <input type="checkbox" id="post-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="w-1/2 max-w-5xl modal-box bg-slate-600">
          <div className="py-3 text-center ">
            <h3 className='font-semibold text-gray-200 underline underline-offset-4'> CREATE NEW POST </h3>
          </div>
          <PostForm
            setImage={setImage}
            setTitle={setTitle}
            setCaption={setCaption}
            image={image}
            title={title}
            caption={caption}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
          />
          <div className="modal-action">
            <button className={`btn btn-info btn-sm ${loading}`} onClick={postPicture}>POST</button>
            <label htmlFor="post-modal" className="text-gray-100 no-underline btn btn-sm btn-link">Close</label>
          </div>
        </div>
      </div>
      <nav className='flex flex-col h-full border-r w-80'>
        <ul className='mb-14'>
          <li className='text-2xl font-bold brand'>Aditya Connect</li>
        </ul>
        <ul className='navWrapper'>

          <Link href="/" className={`${router.route == '/' ? "active" : null}`}>
            <li className='navLink'>
              <FiHome /> <span>Home</span>
            </li>
          </Link>
          <li className='navLink'>
            <FiSearch /> <span>Search</span>
          </li>
          <li className='navLink'>
            <FiCompass /> <span>Explore</span>
          </li>
          <li className=''>

            <label htmlFor="post-modal" className='navLink'><FiPlusSquare /> <span>Create Post</span></label>
          </li>
        </ul>
        <ul className='justify-end h-full navWrapper'>
          {context?.user?._id ?
            <>

              <li className='border-t navLink' onClick={logout}>
                <FiLogOut /> <span>Logout</span>
              </li>
              <Link href="/profile" className={`${router.route == '/profile' ? "active" : null}`}>
                <li className=' navLink'>
                  <FiUser /> <span>Profile</span>
                </li>
              </Link>
            </> :

            <Link href="/login" className={`${router.route == '/login' ? "active" : null}`}>
              <li className='border-t navLink'>
                <FiLogIn /> <span>Login</span>
              </li>
            </Link>
          }
        </ul>
      </nav>
    </>

  )
}

export default NavBar