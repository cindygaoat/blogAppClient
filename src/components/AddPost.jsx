
import { useState, useEffect, useContext } from 'react';
import { Form,Button, Container, Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import UserContext from '../hooks/UserContext';

export default function AddPost(){

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    //input states
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");

    function createPost(e){

        e.preventDefault();

        let token = localStorage.getItem('token');
        console.log(token);

        fetch('https://blogappapi-czfe.onrender.com/posts/addPost',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                content: content,
                author: user.username
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if(data.error === "Failed to add post"){
                Swal.fire({
                    title: "Post Creation Error",
                    icon: "error",
                    text: "Unsuccessful Post Creation.",
                });
                

            } else {
                
                setTitle("")
                setContent("")

                Swal.fire({
                    title: "Post Added",
                    icon: "success",
                    text: "Post Added Successfully",
                });

                navigate("/posts");
            }

        })

    }

    return (

            (user.isAdmin === false && user.id !== null)
            ?
            <>
                <Container className="my-5">
                    <Row className="justify-content-center">
                        <Col xs={12} sm={10} md={8} lg={6}>
                            <h1 className="text-center mb-4">Add Post</h1>
                            <Form onSubmit={createPost} className="p-4 border rounded bg-light">
                                <Form.Group className="mb-3">
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Title"
                                        required
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Content:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Enter Content"
                                        required
                                        value={content}
                                        onChange={e => setContent(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
            :
            <Navigate to="/posts" />

    )


}