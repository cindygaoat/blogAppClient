import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../index.css'; // Import CSS for styling

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [showCommentsModal, setShowCommentsModal] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    // const fetchPosts = async () => {
    //     try {
    //         const response = await fetch('http://localhost:4000/posts/getPosts');
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         setPosts(data.posts);
    //     } catch (error) {
    //         console.error('Error fetching posts:', error);
    //     }
    // };

    const fetchPosts = () => {
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

    const handleViewComments = async (postId) => {
        try {
            const response = await fetch(`https://blogappapi-czfe.onrender.com/getComments/${postId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setComments(data.comments);
            setSelectedPost(postId);
            setShowCommentsModal(true);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    // const handleDeleteAllPosts = async () => {
    //     const result = await Swal.fire({
    //         title: 'Are you sure?',
    //         text: "This action will delete all posts!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete all!'
    //     });

    //     if (result.isConfirmed) {
    //         try {
    //             const response = await fetch('http://localhost:4000/posts/deleteAllPost', {
    //                 method: 'DELETE'
    //             });
    //             if (response.message === "All post deleted successfully") {
    //                 Swal.fire(
    //                     'Deleted!',
    //                     'All posts have been deleted.',
    //                     'success'
    //                 );
    //                 setPosts([]);
                    
    //             } else {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
                
    //         } catch (error) {
    //             console.error('Error deleting posts:', error);
    //             Swal.fire(
    //                 'Error!',
    //                 'There was an issue deleting the posts.',
    //                 'error'
    //             );
    //         }
    //     }
    // };

    const handleDeleteAllPosts = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://blogappapi-czfe.onrender.com/posts/deleteAllPost`, {
                    method: 'DELETE',
                    // headers: {
                    //     'Authorization': `Bearer ${ localStorage.getItem('token') }` // Add the token for authorization
                    // }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === "All post deleted successfully") {
                        Swal.fire({
                            title: 'Deleted!',
                            icon: 'success',
                            text: 'All posts have been deleted.'
                        });
                        navigate('/');
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            icon: 'error',
                            text: data.message || 'Failed to delete post.'
                        });
                    }
                })
                .catch(error => {
                    console.error('Error deleting post:', error);
                    Swal.fire({
                        title: 'Error!',
                        icon: 'error',
                        text: 'Failed to delete post.'
                    });
                });
            }
        });
    };


    const handleDeleteAllComments = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action will delete all comments for this post!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete all comments!'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://blogappapi-czfe.onrender.com/posts/deleteComment/${selectedPost}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                Swal.fire(
                    'Deleted!',
                    'All comments for the selected post have been deleted.',
                    'success'
                );
                setComments([]);
            } catch (error) {
                console.error('Error deleting comments:', error);
                Swal.fire(
                    'Error!',
                    'There was an issue deleting the comments.',
                    'error'
                );
            }
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="d-flex justify-content-end mb-3">
                <Button variant="danger" onClick={handleDeleteAllPosts}>
                    Delete All Posts
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Author</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post._id}>
                            <td>{post._id}</td>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td>{post.author}</td>
                            <td>{new Date(post.dateCreated).toLocaleDateString()}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleViewComments(post._id)}>
                                    View Comments
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Comments Modal */}
            <Modal show={showCommentsModal} onHide={() => setShowCommentsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Comments for Post ID: {selectedPost}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-end mb-3">
                        <Button variant="danger" onClick={handleDeleteAllComments}>
                            Delete All Comments
                        </Button>
                    </div>
                    <ul>
                        {comments.length > 0 ? (
                            comments.map(comment => (
                                <li key={comment._id}>
                                    {comment.comment}
                                </li>
                            ))
                        ) : (
                            <p>No comments available.</p>
                        )}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCommentsModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminDashboard;
