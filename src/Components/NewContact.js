import React from "react";
import { useState, useEffect } from "react";

import { Modal, Form, Button, Container, Col, Row } from "react-bootstrap";
import { fromAddress, setDefaults } from "react-geocode";

function NewContact({onCreate}) {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cep, setCep] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUF] = useState("");
    const [complement, setComplement] = useState("");
    const [lat, setLat] = useState("0");
    const [lng, setLng] = useState("0");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const token = sessionStorage.getItem('token');
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                name: name,
                cpf: cpf,
                email: email,
                phone: phone,
                address: {
                    street: street,
                    neighborhood: neighborhood,
                    number: number,
                    city: city,
                    state: uf,
                    zip_code: cep,
                    latitude: lat,
                    longitude: lng
                }
            }),
        }).then(res => res.json())
        .then(
            (result) => {
                if(result.success) {
                    alert("Contato cadastrado");
                    setName("");
                    setCpf("");
                    setEmail("");
                    setPhone("");
                    setCep("");
                    handleClose();
                    onCreate(result.data);
                }else{
                    const errors = Object.values(result.errors)
                    alert(errors);
                    
                }
            },
            (error) => {
                console.error(error);
            }
        )
    }

    
    const requestAddress = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/bycep/${cep}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        const data = await response.json();
        setCity(data.localidade);
        setStreet(data.logradouro);
        setNeighborhood(data.bairro);
        setUF(data.uf)
        console.log(data);

    }

    setDefaults({
        key: "AIzaSyBPjQv5lXUBQ7kC__ggw6WXQpwtfLE0We8", // Your API key here.
        language: "en", // Default language for responses.
        region: "br", // Default region for responses.
      });
    const set_latlng = async (e) => {
        setNumber(e)
        const address = `${street}, ${number} - ${neighborhood} - ${city} / ${uf}`;
        fromAddress(address)
        .then(({ results }) => {
            const coord = results[0].geometry.location
            setLat(coord.lat);
            setLng(coord.lng);
        })
        .catch(console.error);
    }

    return(
        <div className="modal show" style={{ display: 'block', position: 'initial', padding: '5px' , width: 'auto'}}>               
                    <Button variant="primary" onClick={handleShow}>
                        Novo Contato
                    </Button>
                    <Modal show={show} onHide={handleClose} size="xl">
                        
                        <Modal.Header closeButton>
                            <Modal.Title>Novo Contato</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Container fluid>
                            <Row>
                            <Col>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCPF">
                                    <Form.Label>CPF</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="CPF"
                                        value={cpf}
                                        onChange={(e) => setCpf(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Telefone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)} />
                                </Form.Group>
                                <h3>Endereço</h3>
                                <Form.Group className="mb-3" controlId="formBasicCep">
                                    <Form.Label>CEP</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="CEP"
                                        value={cep}
                                        onChange={(e) => setCep(e.target.value)} />
                                </Form.Group>
                                <Button onClick={requestAddress}>Buscar Cep</Button>

                                <Form.Group className="mb-3" controlId="formBasicCep">
                                <Form.Label>Rua</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Rua"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCep">
                                    <Form.Label>Bairro</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Bairro"
                                        value={neighborhood}
                                        onChange={(e) => setNeighborhood(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCep">
                                <Form.Label>Numero</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Numero"
                                    value={number}
                                    onChange={(e) => set_latlng(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCep">
                                <Form.Label>Complemento</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Complemento"
                                    value={complement}
                                    onChange={(e) => setComplement(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCep">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Cidade"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCep">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Estado"
                                    value={uf}
                                    onChange={(e) => setUF(e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    Cadastrar
                                </Button>
                            </Form>
                        </Col>
                        
                        </Row>
                    </Container>
                
                    
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default NewContact;