import Sidebar from "../components/Sidebar"
import Button from "../components/Button"
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import authStorage from "../auth/storage";
import { Formik } from "formik";
import * as Yup from "yup"
import ErrorMessage from "../components/ErrorMessage";
import ownerApi from "../api/owners";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("name"),
    NID: Yup.string().required().label("NID"),
    phone: Yup.string().required().label("phone"),
    address: Yup.string().required().label("address")
})

const OwnersPage = ()=>{
    // const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, isLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const handleAddClick = ()=>{
        setShowPopup(true);
    }
    const handleClosePopup = ()=>{
        setShowPopup(false);
    }
    const token = authStorage.getToken();
    const user = jwtDecode(token);
    const handleRegister= async({
        name,
        NID,
        phone, 
        address
    })=>{
        isLoading(true);
        const result = await ownerApi.register(
            name,
            NID, 
            phone,
            address
        );
        isLoading(false);
        if(!result.ok) return setError(result.data.status  || result.data.error);
        alert("Owner Created successfully!");
        handleClosePopup();
    }
    const [owners, setOwners]= useState([]);
    
    const fetchOwners = async ()=> {
        try{
            const result = await ownerApi.getOwners();
            // console.log(JSON.stringify(result))
            console.log(result.owners)

            setOwners(result.owners || []);
        }catch(e){
            console.log(e);
        }

    }

    useEffect(() => {
        fetchOwners();
      }, []);
    return(
        <div>
            <Sidebar user={user} activeItem="owners"/>
            <div className="create-btn" style={{marginLeft: 300, paddingTop: 30}}>
                <div className="owner">
                    <Button text={"Create Car Owner"} onClick={handleAddClick}/>
                </div>
                {showPopup && (
                    <div className="popup">
                        <div className="flex-display">
                        <div className="create">
                            <h1 style={{marginBottom: 25, marginTop: 10}}>Create Owner</h1>
                            <Formik 
                            initialValues={{name: "", NID: "", phone: "", address:""}}
                            onSubmit={(values) => handleRegister(values)}
                            validationSchema={validationSchema}
                            >
                                {({
                                    handleSubmit,
                                    handleChange,
                                    setFieldTouched,
                                    touched,
                                    errors
                                })=>(
                                    <div>
                                        <div className="row" >
                                            <label htmlFor="name">Full Name</label>
                                            <input 
                                            type={"text"} 
                                            placeholder="Full Name" 
                                            onChange={handleChange("name")} 
                                            onBlur={()=> setFieldTouched("name")} 
                                            />
                                            {touched.name && <ErrorMessage text={errors.name}/>}
                                        </div>
                                        <div className="row" >
                                            <label htmlFor="NID">National ID</label>
                                            <input 
                                            type={"text"} 
                                            placeholder="National ID"
                                            onChange={handleChange("NID")}
                                            onBlur={()=> setFieldTouched("NID")}
                                            />
                                            {touched.NID && <ErrorMessage text={errors.NID}/>}
                                        </div>
                                        <div className="row" >
                                            <label htmlFor="phone">Phone</label>
                                            <input 
                                            type={"text"} 
                                            placeholder="Phone"
                                            onChange={handleChange("phone")}
                                            onBlur={()=> setFieldTouched("phone")}
                                            />
                                            {touched.phone && <ErrorMessage text={errors.phone}/>}
                                        </div>
                                        <div className="row" >
                                            <label htmlFor="address">Address</label>
                                            <input 
                                            type={"text"} 
                                            placeholder="Address"
                                            onChange={handleChange("address")}
                                            onBlur={()=> setFieldTouched("address")}
                                            />
                                        </div>
                                        <Button type={"submit"} onClick={handleSubmit} text={loading ? "Loading.....": "Create"} width={100}/>

                                    </div>
                                        
                                )}

                            </Formik>
                            
                        </div>
                                                
                        <div onClick={handleClosePopup}>
                            <p className="close-btn">X</p>
                        </div>
                        </div>


                    </div>
                )}
            </div>
            <div>
            <table className="table" style={{width: 900, marginLeft: 300, marginTop: 50}}>
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">National ID</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map((owner, index)=> (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                            <td>{owner.name}</td>
                            <td>{owner.NID}</td>
                            <td>{owner.phone}</td>
                            <td>{owner.address}</td>
                            <td className="action">
                                <div>
                                <Button text={"Edit"} />
                                </div>
                                <div>
                                <Button text={"Delete"}/>
                                </div>

                            </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}
export default OwnersPage