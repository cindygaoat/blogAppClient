
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import '../index.css'

const PostCard = ({ post }) => {
    console.log("PostCard: ", post);

    const navigate = useNavigate(); 

    const handleViewPost = () => {
        navigate(`/post/${post._id}`); 
    };

    return (
        <Card className="post-card mb-3">
            <Card.Body>
                <div className="d-flex align-items-center mb-2">
                    <FaUser className="me-2" />
                    <Card.Title>{post.username}</Card.Title>
                </div>
                <Card.Subtitle>
                    {post.title}
                </Card.Subtitle>
                <Card.Text>
                    {post.content}
                </Card.Text>
                <div className="d-flex justify-content-end">
                    <Card.Subtitle className="text-muted">
                        {post.date}
                    </Card.Subtitle>
                    <Button variant="primary" onClick={handleViewPost}>
                        View Post
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default PostCard;
