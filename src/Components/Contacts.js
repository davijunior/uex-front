import React from "react";
import { useState, useEffect } from "react";
import NewContact from "./NewContact";
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Button } from "react-bootstrap";
import Auth from "./Auth";
import MapContainer from "./MapContainer";

function Contacts(props){
    const [contacts, setContacts] = useState([]);
    const token = sessionStorage.getItem('token');
    useEffect(
        () => {
            fetchContacts();
        },
        []
    )

    const deleteContacts = (id) =>{
        try{
            fetch(`http://localhost:3000/contacts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            const data = contacts.filter(contact => contact.id !== id);
            setContacts(data);
        }
        catch(error){
            console.log(error)
        }
    }

    const fetchContacts = async () =>{
        try {
            const response = await fetch("http://localhost:3000/contacts", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            const data = await response.json();
            setContacts(data);
        }
        catch (error) {
            console.log(error)
        }
    }
    const newContact = (contact) => {
        setContacts([contact, ...contacts])
    }
    const is_authenticated = false; 
    return(
        <div>
            <Auth></Auth>
            <NewContact onCreate={newContact}></NewContact>
                {contacts.map(contact => (
                    <Container>
                    <Accordion>
                        <Accordion.Item eventKey={contact.id}>  
                            <Accordion.Header>
                                {contact.name}
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Nome: {contact.name}</ListGroup.Item>
                                    <ListGroup.Item>Telefone: {contact.phone}</ListGroup.Item>
                                    <ListGroup.Item>Endereço: {contact.address.street}, {contact.address.number}</ListGroup.Item>
                                    <ListGroup.Item>Bairro: {contact.address.neighborhood}</ListGroup.Item>
                                    <ListGroup.Item>Complemento: {contact.address.complement}</ListGroup.Item>
                                    <ListGroup.Item>Cidade: {contact.address.city}/{contact.address.state}</ListGroup.Item>

                                    <ListGroup.Item>
                                        <div style= {{width:'100%', height: '1000px', position:'relative'}}>
                                        <MapContainer lat={contact.address.latitude} lng={contact.address.longitude}>
                                        </MapContainer>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                                <Button onClick={() => deleteContacts(contact.id)}>Excluir</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    </Container>
                ))}
        </div>
    )
}

export default Contacts;