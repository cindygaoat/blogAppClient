
import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';

export default function PostList({postsData}) {

    return(
        <>
            <div className="post-list">
                {postsData.length === 0 ? (<div>No posts available</div>) 
                : 
                    (
                    postsData.map(post => (
                        <PostCard key={post._id} post={post} />
                    ))
                )}
            </div>
        </>
        )
}
