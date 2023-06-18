import Sidebar from "../components/Sidebar"
import Button from "../components/Button"
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import authStorage from "../auth/storage";
import { Formik } from "formik";
import * as Yup from "yup"
import ErrorMessage from "../components/ErrorMessage";
import ownerApi from "../api/owners";
import carsApi from "../api/cars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const validationSchema = Yup.object().shape({
    chasisNumber: Yup.string().required().label("chasisNumber"),
    manufacturer: Yup.string().required().label("manufacturer"),
    manufactureYear: Yup.string().required().label("year"),
    price: Yup.string().required().label("price"),
    model: Yup.string().required().label("model"),
    owner: Yup.string().required().label("owner")
})

const VehiclesPage = ()=>{
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
        chasisNumber,
        manufacturer,
        manufactureYear,
        price,
        model,
        owner
    })=>{
        console.log(owner);
        isLoading(true);
        const result = await carsApi.register(
            chasisNumber,
            manufacturer,
            manufactureYear,
            price,
            model,
            owner
        );
        isLoading(false);
        if(!result.ok) return setError(result.data.status  || result.data.error);
        alert("Car Created successfully!");
        handleClosePopup();
    }
    const [cars, setCars]= useState([]);
    
    const fetchCars = async ()=> {
        try{
            const result = await carsApi.getCars();
            // console.log(JSON.stringify(result))
            console.log(result.cars)

            setCars(result.cars || []);
        }catch(e){
            console.log(e);
        }

    }

    useEffect(() => {
        fetchCars();
      }, []);

      const [owners, setOwners] = useState([])
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


    const handleDelete = async (id)=>{
        try{
            await carsApi.deleteCar(id);
            fetchCars();
        }catch(e){
            console.log("Error Deleting Car");
            console.error(e);
        }
    }
    return(
        <div className="flex-container">
            <Sidebar user={user} activeItem="vehicles"/>
            <div className="sub mt-4">
                <div className="mt-5 mx-3" style={{ paddingTop: 30, marginLeft: 70}}>
                    <div className="mt-4 mx-3" >
                        <Button text={"Register Car"} onClick={handleAddClick}/>
                    </div>
                    {showPopup && (
                        <div className="popup">
                            <div className="flex-display">
                                <div className="create">
                                    <h1 style={{marginBottom: 25, marginTop: 10}}>Register Car</h1>
                                    <Formik 
                                    initialValues={{
                                        chasisNumber: "", 
                                        manufacturer: "", 
                                        manufactureYear: "", 
                                        price:"",
                                        model: "",
                                        owner:""
                                    }}
                                    onSubmit={(values) => handleRegister(values)}
                                    validationSchema={validationSchema}
                                    >
                                        {({
                                            handleSubmit,
                                            handleChange,
                                            setFieldValue,
                                            setFieldTouched,
                                            touched,
                                            errors,
                                            values
                                        })=>(
                                            <div>
                                                <div className="row" >
                                                    <label htmlFor="chasis">Chasis Number</label>
                                                    <input 
                                                    type={"text"} 
                                                    placeholder="Chasis Number" 
                                                    onChange={handleChange("chasisNumber")} 
                                                    onBlur={()=> setFieldTouched("chasisNumber")} 
                                                    />
                                                    {touched.chasisNumber && <ErrorMessage text={errors.chasisNumber}/>}
                                                </div>
                                                <div className="row" >
                                                    <label htmlFor="manufacturer">Manufacture Company</label>
                                                    <input 
                                                    type={"text"} 
                                                    placeholder="Manufacture Company"
                                                    onChange={handleChange("manufacturer")}
                                                    onBlur={()=> setFieldTouched("manufacturer")}
                                                    />  
                                                    {touched.manufacturer && <ErrorMessage text={errors.manufacturer}/>}
                                                </div>
                                                <div className="row" >
                                                    <label htmlFor="year">Manufacture Year</label>
                                                    <input 
                                                    type={"text"} 
                                                    placeholder="Manufacturer Year"
                                                    onChange={handleChange("manufactureYear")}
                                                    onBlur={()=> setFieldTouched("manufactureYear")}
                                                    />
                                                    {touched.manufactureYear && <ErrorMessage text={errors.manufactureYear}/>}
                                                </div>
                                                <div className="row" >
                                                    <label htmlFor="price">Price</label>
                                                    <input 
                                                    type={"text"} 
                                                    placeholder="Price"
                                                    onChange={handleChange("price")}
                                                    onBlur={()=> setFieldTouched("price")}
                                                    />
                                                    {touched.price && <ErrorMessage text={errors.price}/>}
                                                </div>
                                                <div className="row" >
                                                    <label htmlFor="model">Model</label>
                                                    <input 
                                                    type={"text"} 
                                                    placeholder="Model"
                                                    onChange={handleChange("model")}
                                                    onBlur={()=> setFieldTouched("model")}
                                                    />
                                                    {touched.model && <ErrorMessage text={errors.model}/>}
                                                </div>
                                                <div className="row" >
                                                    <label htmlFor="owner">Owner</label>
                                                    <select
                                                    id="owner"
                                                    name="owner"
                                                    onChange={(event) => {
                                                    handleChange("owner")(event);
                                                    setFieldValue("owner", event.target.value);
                                                    }}
                                                    onBlur={() => setFieldTouched("owner")}
                                                    value={values.owner}
                                                    >
                                                    <option value="">Select Owner</option>
                                                    {owners.map((owner, index) => (
                                                    <option value={owner._id} key={index}>
                                                    {owner.name}
                                                    </option>
                                                    ))}
                                                    </select>
                                                    {touched.owner && <ErrorMessage text={errors.owner}/>}
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
            <div className="table-responsive">
                <table className="table" style={{marginLeft:60, marginTop: 50, tableLayout: "fixed"}}>
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Chasis Number</th>
                    <th scope="col">Manufacturer</th>
                    <th scope="col">manufactureYear</th>
                    <th scope="col">Price</th>
                    <th scope="col">Plate Number</th>
                    <th scope="col">Model</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car, index)=> (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                            <td>{car.chasisNumber}</td>
                            <td>{car.manufacturer}</td>
                            <td>{car.manufactureYear}</td>
                            <td>{car.price}</td>
                            <td>{car.plateNumber}</td>
                            <td>{car.model}</td>
                            <td className="action">
                                <div >
                                {/* <Button text={"Edit"} /> */}
                                <FontAwesomeIcon icon={faEdit} className="pt-3 px-3 pb-4" style={{fontSize: 15,cursor: "pointer"}} />
                                </div>
                                <div >
                                <FontAwesomeIcon icon={faTrash} className="pt-3 px-3 pb-4" style={{fontSize: 15, cursor: "pointer"}} color={" #ff8390"} onClick={()=> handleDelete(car._id)}/>
                                </div>


                            </td>
                    </tr>
                    ))}
                </tbody>
                </table>    
            </div>

        </div>
            
        </div>
    )
}
export default VehiclesPage;