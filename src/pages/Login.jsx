import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../hooks/UserContext';

const Login = () => {
    const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('')
	const [isActive, setIsActive] = useState(true);

	const handleLogin = (e) => {
		e.preventDefault();

		fetch(`https://blogappapi-czfe.onrender.com/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
			.then(res => res.json())
			.then(data => {
				console.log("Login Data", data);
				if (data.access !== undefined) {

					console.log(data.access);
					localStorage.setItem('token', data.access);
					retrieveUserDetails(data.access);
					setEmail('');
					setPassword('');

					Swal.fire({
						title: "Login Successful",
						icon: "success",
						text: "You are now logged in."
					})

				} else if (data.message == "Email and password do not match") {

					Swal.fire({
						title: "Login Failed",
						icon: "error",
						text: "Incorrect email or password."
					})

				} else {

					Swal.fire({
						title: "User Not Found",
						icon: "error",
						text: `${email} does not exist.`
					})

				}
			})
	}

	function retrieveUserDetails(token) {
		fetch('https://blogappapi-czfe.onrender.com/users/details', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setUser({
					id: data.user._id,
                    username: data.user.username,
                    isAdmin: data.user.isAdmin
				});
			})
	}

    return (
        (user.id !== null && user !== undefined) ?
        <Navigate to='/' /> 
        :
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6}>
                    <h1 className="text-center mb-4">Login</h1>
                    <Form onSubmit={handleLogin} className="p-4 border rounded bg-light">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
