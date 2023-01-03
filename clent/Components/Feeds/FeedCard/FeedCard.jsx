import React from 'react'

const FeedCard = ({ post }) => {
    return (
        <><div className="card lg:card-side bg-slate-100 shadow-xl h-96 bgCust">
            <figure className='w-96'><img src={`${process.env.NEXT_PUBLIC_API}/posts/${post.image}`} alt="Album" /></figure>
            <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <p>{post.caption}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Listen</button>
                </div>
            </div>
        </div></>
    )
}

export default FeedCard