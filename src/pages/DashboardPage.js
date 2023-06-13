import authApi from "../api/auth"
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ApiClient from "../api/client";
import authStorage from "../auth/storage";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import jwtDecode from "jwt-decode"

const DashboardPage = ()=>{
    const token = authStorage.getToken();
    const user = jwtDecode(token);
    return(
        <div className="flex-container">
            <Sidebar user={user} activeItem="dashboard"/>
            <div className="sub">
                <h2>Dashboard</h2>
                <div className="create-btn">

                    <div className="car">
                        <Button text={"Register Car"}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardPage