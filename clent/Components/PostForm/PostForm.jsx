import React, { useRef } from 'react'
const PostForm = ({
    setImage,
    setTitle,
    setCaption,
    title,
    caption,
    previewImage,
    setPreviewImage
}) => {
    const filePicekerRef = useRef();


    function previewFile(e) {
        // Reading New File (open file Picker Box)
        const reader = new FileReader();
        // Gettting Selected File (user can select multiple but we are choosing only one)
        const selectedFile = e.target.files[0];
        setImage(selectedFile)
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
        // As the File loaded then set the stage as per the file type
        reader.onload = (readerEvent) => {
            setPreviewImage(readerEvent.target.result);
        };
    }

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl overflow-hidden">
            <label>
                <figure className='md:w-96 max-h-[400px]'>
                    <img src={previewImage} alt="Album" accept="image/*" />
                    <input type="file" ref={filePicekerRef} className='hidden' onChange={previewFile} />
                </figure>
            </label>
            <div className="card-body">
                <input value={title} onChange={e => setTitle(e.target.value)} className="card-title outline-none" placeholder='Type title of your post here' />
                <textarea value={caption} onChange={e => setCaption(e.target.value)} rows="5" wrap="hard" className='h-full outline-none' placeholder='Caption your post here' ></textarea>
            </div>
        </div>
    )
}

export default PostForm