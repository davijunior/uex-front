import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate, useNavigate } from 'react-router-dom';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password}),
        })
        .then(res => res.json())
        .then(
            (result) => {
                sessionStorage.setItem('user', JSON.stringify(result.user));
                sessionStorage.setItem('token', result.token);
                navigate("/")
            },
            (error) => {
                console.error(error);
            }
        )
    };
    return(
        <div>
            <div>{token && <Navigate to="/" replace={true} />}</div>
        <Form>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control 
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Entrar
            </Button>
        </Form>
        </div>
    )
}

export default Login;