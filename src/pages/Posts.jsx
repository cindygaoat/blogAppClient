
import { useState, useEffect, useContext } from 'react';
import UserContext from '../hooks/UserContext';
import PostList from '../components/PostList';

export default function Courses() {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    const fetchData = () => {
        const fetchUrl = "https://blogappapi-czfe.onrender.com/posts/getPosts";

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Posts:", data);
                if (data.message === "No posts found") {
                    setPosts([]);
                } else {
                    setPosts(data.posts);
                }
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
                setPosts([]); 
            });
    };

    useEffect(() => {
        fetchData();
    }, [user]); // run fetchData when `user` changes

    useEffect(() => {
        console.log("Updated posts:", posts);
    }, [posts]); // log the updated posts when `posts` changes

    return (
        <>
            <PostList postsData={posts} />
        </>
    );
}
