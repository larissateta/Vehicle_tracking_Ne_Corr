import React from "react";
import authStorage from "../auth/storage";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children})=>{
    return authStorage.getToken() ? children : <Navigate to={'/'}/>
}

export default ProtectedRoute