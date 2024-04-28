import React from "react";
import { Navigate } from 'react-router-dom';


function Auth(){
    const authentication = sessionStorage.getItem('token');
    return(
        <div>{!authentication && <Navigate to="/login" replace={true} />}</div>
    )
}

export default Auth;