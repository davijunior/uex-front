import React from "react";
import { Button, ListGroup } from "react-bootstrap";

import { useState } from "react";

function Header(isAuthenticated){
    return(
        <div>
        <ListGroup horizontal>
            <ListGroup.Item ><a href="/">Contatos</a></ListGroup.Item>
            {!isAuthenticated && <ListGroup.Item ><a href="/login">Login</a></ListGroup.Item>}
        </ListGroup>
        </div>
    )
}

export default Header;