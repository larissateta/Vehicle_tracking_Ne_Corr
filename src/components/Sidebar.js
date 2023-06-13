import { useState } from "react"
import Button from "./Button";
import authStorage from "../auth/storage";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarRear, faHome, faUsers } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Ci5tJaMWEAAEDPi.jpg";

const Sidebar = ({user, activeItem})=>{
    const [selected, setSelected] = useState(activeItem);
    const navigate = useNavigate();
    const handleItemClick = (item)=>{
        
        console.log(item);
        if(item && item.name){
            setSelected(item.name);
        }
        if(item.name === "dashboard"){
            navigate("/dashboard");
        }else if(item.name === "vehicles"){
            navigate("/vehicles");
        }else if(item.name === "owners"){
            navigate("/owners");
        }

    }

    const handleLogout = ()=>{
        authStorage.removeToken();
        navigate("/")
    }
    return(
        <div className="sidebar">
            <div className="logo" style={{fontSize: 10, textAlign: "center", marginTop: 20}}>
                {/* <h1>VEHICLE <span style={{color: "dodgerblue"}}>TRACKER</span></h1> */}
                <img src={logo} alt="logo" style={{width: 100}}/>
            </div>
            <div style={{textAlign: "center", marginTop: 10}}>
                <p>Welcome <span>{user.name}</span></p>
            </div>
            <div className="sidebar-items">
                <div className={`item1 ${selected === "dashboard" ? "activ" : ""}`} onClick={() => handleItemClick({name: "dashboard"})}>
                    <FontAwesomeIcon icon={faHome} className="icon"/>
                    Dashboard
                </div>

                <div className={`item1 ${selected === "vehicles" ? "activ" : ""}`} onClick={()=> handleItemClick({name: "vehicles"})}>
                    <FontAwesomeIcon icon={faCarRear} className="icon" color="black"/>
                    Vehicles
                </div>
                <div className={`item1 ${selected === "owners" ? "activ" : ""}`} onClick={()=> handleItemClick({name: "owners"})}>
                    <FontAwesomeIcon icon={faUsers} className="icon" color="black"/>
                    Owners
                </div>
            </div>
            <div className="logout-btn">
                <Button text={"Logout"} width={100} onClick={handleLogout}/>
            </div>
        </div>
    )
}

export default Sidebar