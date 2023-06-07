import { useState } from "react"
import Button from "./Button";
import authStorage from "../auth/storage";
import { useNavigate } from "react-router-dom";

const Sidebar = ()=>{
    const [selected, setSelected] = useState("dashboard");
    const handleItemClick = (item)=>{
        setSelected(item);
    }
    const navigate = useNavigate();

    const handleLogout = ()=>{
        authStorage.removeToken();
        navigate("/")
    }
    return(
        <div className="sidebar">
            <div className="logo" style={{fontSize: 10, textAlign: "center", marginTop: 20}}>
                <h1>VEHICLE <span style={{color: "dodgerblue"}}>TRACKER</span></h1>
            </div>
            <div className="sidebar-items">
                <div className={`item ${selected === "dashboard" ? "active" : ""}`} onClick={() => handleItemClick("dashboard")}>
                    Dashboard
                </div>
                <div className={`item ${selected === "vehicles" ? "active" : ""}`} onClick={()=> handleItemClick("vehicles")}>
                    Vehicles
                </div>
                <div className={`item ${selected === "owners" ? "active" : ""}`} onClick={()=> handleItemClick("owners")}>
                    Owners
                </div>
                <div className={`item ${selected === "search" ? "active" : ""}`} onClick={()=> handleItemClick("search")}>
                    Search
                </div>
            </div>
            <div className="logout-btn">
                <Button text={"Logout"} width={100} onClick={handleLogout}/>
            </div>
        </div>
    )
}

export default Sidebar