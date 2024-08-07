// FeaturedPost.js
import React from 'react';
import '../index.css'; // Import custom CSS for styling

const FeaturedPost = ({ post }) => {
    return (
        <div className="featured-post">
            <h3 className="featured-post-title">{post.title}</h3>
            <p className="featured-post-content">{post.content}</p>
            <a href={post.link} className="featured-post-link">View Post</a>
        </div>
    );
};

export default FeaturedPost;
