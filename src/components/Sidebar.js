import { useState } from "react"
import Button from "./Button";
import authStorage from "../auth/storage";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarRear, faHome, faUsers, faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Ci5tJaMWEAAEDPi.jpg";

const Sidebar = ({user, activeItem})=>{
    const [isOpen, setIsOpen]= useState(true);
    const toggle = ()=> setIsOpen(!isOpen);

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
        <div className={`sidebar ${isOpen ? "opened" : "closed"} `} >
            <div className="logo" style={{fontSize: 10, textAlign: "center", marginTop: 20}}>
                <img src={logo} alt="logo" style={{width: 80}}/>
                <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="menu-toggle">
                    <FontAwesomeIcon icon={faBars} onClick={toggle} style={{fontSize: 15}}/>
                </div>
            </div>
            <div style={{textAlign: "center", marginTop: 10}} className="user-info" >
                <p >Welcome <span>{user.name}</span></p>
            </div>
            <div className="sidebar-items">
                <div className={`item1 ${selected === "dashboard" ? "activ" : ""}`} onClick={() => handleItemClick({name: "dashboard"})}>
                    <FontAwesomeIcon icon={faHome} className="icon"/>
                    <span>Dashboard</span>
                </div>

                <div className={`item1 ${selected === "vehicles" ? "activ" : ""}`} onClick={()=> handleItemClick({name: "vehicles"})}>
                    <FontAwesomeIcon icon={faCarRear} className="icon" color="black"/>
                    <span>Vehicles</span>

                </div>
                <div className={`item1 ${selected === "owners" ? "activ" : ""}`} onClick={()=> handleItemClick({name: "owners"})}>
                    <FontAwesomeIcon icon={faUsers} className="icon" color="black"/>
                    <span>Owners</span>
                </div>
            </div>
            <div className="logout-btn">
                <Button text={"Logout"} width={100} onClick={handleLogout}/>
            </div>
        </div>
    )
}

export default Sidebar