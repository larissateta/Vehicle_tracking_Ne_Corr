import authApi from "../api/auth"
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ApiClient from "../api/client";
import authStorage from "../auth/storage";
import Sidebar from "../components/Sidebar";

const DashboardPage = ()=>{
    const navigate = useNavigate();
    const handleLogout = ()=>{
        authStorage.removeToken();
        navigate("/");
    }
    return(
        <div className="flex-container">
            <Sidebar/>
            <div className="sub">
                <h2>Dashboard</h2>
                <div className="create-btn">
                    <div className="owner">
                        <Button text={"Create Car Owner"}/>
                    </div>
                    <div className="car">
                        <Button text={"Register Car"}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardPage