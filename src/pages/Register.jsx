import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import UserContext from '../hooks/UserContext';
import Swal from 'sweetalert2';

const Register = () => {

    const { user } = useContext(UserContext);
	const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleRegister(e) {
		e.preventDefault();

		fetch(`https://blogappapi-czfe.onrender.com/users/register`, {

			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password
			})

		})
			.then(res => res.json())
			.then(data => {
				if (data.message === "Registered Successfully") {
					setUsername("");
					setEmail("");
					setPassword("");
					setConfirmPassword("");

					Swal.fire({
						title: "Registration successful",
						icon: "success",
						text: "You are now registered."
					})
					navigate("/login");
				} else if (data.error === "Email invalid") {
					Swal.fire({
						title: "Email is invalid",
						icon: "error",
						text: "Please enter a valid email"
					})
				} else if (data.error === "Username should not contain space and must be atleast 6 characters") {
					Swal.fire({
						title: "Username is invalid",
						icon: "error",
						text: "Username should be atleast 6 characters and not contain any whitespace"
					})
				} else if (data.error === "Password must be atleast 8 characters") {
					Swal.fire({
						title: "Password is invalid",
						icon: "error",
						text: "Password must be at least 8 characters"
					})
				} else {
					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please Contact the administrator"
					})
				}
			})
	}


    return (
        (user.id !== null && user !== undefined) ?
        <Navigate to='/login' /> 
        :
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6}>
                    <h1 className="text-center mb-4">Register</h1>
                    <Form onSubmit={handleRegister} className="p-4 border rounded bg-light">
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your username" 
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm Password" 
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4">
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;
