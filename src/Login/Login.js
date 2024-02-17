import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import AuthService from '../Services/AuthService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('clbkUserId');
    }, []);

    const handleLogin = async () => {
        try {
            const result = await AuthService.login(email, password);
            const user = result.filter(usr => usr.email == email && usr.password == password);
            if (user?.length) {
                localStorage.setItem('clbkUserId', user[0].id);
                navigate('/home');
            } else
                alert('wrong username and password')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h2>Login</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="button" onClick={handleLogin}>
                            Login
                        </Button>
                        <Form.Text className="text-muted">
                            Already have an account? <Link to="/signup">Signup</Link>
                        </Form.Text>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
