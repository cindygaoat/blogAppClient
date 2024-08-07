import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../hooks/UserContext';

const ViewPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [post, setPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(`https://blogappapi-czfe.onrender.com/posts/getPost/${postId}`)
            .then(response => response.json())
            .then(data => {
                setPost(data);
                setTitle(data.title);
                setContent(data.content);
            })
            .catch(error => console.error('Error fetching post:', error));
    }, [postId]);

    const handleUpdate = (e) => {
        e.preventDefault();

        fetch(`https://blogappapi-czfe.onrender.com/posts/updatePost/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ localStorage.getItem('token') }` // Add the token for authorization
            },
            body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    title: 'Post updated successfully!',
                    icon: 'success',
                    text: 'Your post has been updated.'
                });
                setPost(data.post);
                setIsEditing(false);
            } else {
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: data.message || 'Failed to update post.'
                });
            }
        })
        .catch(error => {
            console.error('Error updating post:', error);
            Swal.fire({
                title: 'Error!',
                icon: 'error',
                text: 'Failed to update post.'
            });
        });
    };

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://blogappapi-czfe.onrender.com/posts/deleteMyPost/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${ localStorage.getItem('token') }` // Add the token for authorization
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire({
                            title: 'Deleted!',
                            icon: 'success',
                            text: 'Your post has been deleted.'
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

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6}>
                    <h1 className="text-center mb-4">{isEditing ? 'Edit Post' : post.title}</h1>
                    {isEditing ? (
                        <Form onSubmit={handleUpdate} className="p-4 border rounded bg-light">
                            <Form.Group controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formContent">
                                <Form.Label>Content</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={5}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-4">
                                Update Post
                            </Button>
                        </Form>
                    ) : (
                        <div className="p-4 border rounded bg-light">
                            <p>{post.content}</p>
                            <div className="d-flex justify-content-end">
                                <Button variant="primary" onClick={() => setIsEditing(true)}>
                                    Edit Post
                                </Button>
                                <Button variant="danger" onClick={handleDelete} className="ms-2">
                                    Delete Post
                                </Button>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ViewPost;
