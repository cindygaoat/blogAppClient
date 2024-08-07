
import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import PostList from '../components/PostList';
import FeaturedPost from '../components/FeaturedPost';
import AddPost from '../components/AddPost';
import '../index.css';
import UserContext from '../hooks/UserContext';


const featuredPost = {
    title: 'Exciting News!',
    content: 'We have some exciting news to share with you. Stay tuned for updates on our latest features and improvements.',
    link: '/featured'
};


const Home = () => {

    const { user } = useContext(UserContext); 

    console.log("Home", user);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = () => {
        fetch('https://blogappapi-czfe.onrender.com/posts/getPosts')
            .then((response) => response.json())
            .then((data) => {
                setPosts(data.posts);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleAddPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    return (
        <div className="app">
            <AddPost />
        </div>
    );
};

export default Home;
