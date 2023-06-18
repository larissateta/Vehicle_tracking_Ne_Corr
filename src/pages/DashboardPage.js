import authApi from "../api/auth"
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ApiClient from "../api/client";
import authStorage from "../auth/storage";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode"
import carsApi from "../api/cars";
import ownerApi from "../api/owners";

const DashboardPage = ()=>{
    const token = authStorage.getToken();
    const user = jwtDecode(token);
    const [cars, setCars] = useState([]);

    const fetchCars = async()=>{
        const result = await carsApi.getCars()
        setCars(result.cars || []);
    }

    const [owners, setOwners] = useState([]);

    const fetchOwners = async ()=>{
        const result = await ownerApi.getOwners();
        setOwners(result.owners || []);
    }
    useEffect(()=>{
        fetchCars();
        fetchOwners();
    }, []);
    const fetchOwner = async(ownerId)=>{
        const result = await ownerApi.getOwner(ownerId);
        return result.owner;
    }
    const sortedCars = cars.sort((a, b)=> b.timestamp - a.timestamp);

    useEffect(() => {
        const fetchOwnersForCars = async () => {
          const ownerPromises = sortedCars.map((car) => fetchOwner(car.owner));
          const fetchedOwners = await Promise.all(ownerPromises);
          setOwners(fetchedOwners);
        };
    
        fetchOwnersForCars();
      }, [sortedCars]);
    return(
        <div className="flex-container">
            <Sidebar user={user} activeItem="dashboard"/>
            <div className="sub mt-3">
                <h2 className="mx-5 mt-4" style={{marginLeft: 70, marginTop: 20, fontSize: 25}}>History of Vehicle Registration</h2>
                <div className="table-responsive">
                    <table className="table" style={{ marginLeft: 70, marginTop: 50, tableLayout: "fixed"}}>
                    <thead>
                        <tr>
                        <th scope="col" className="m-3">#</th>
                        <th scope="col">Chasis Number</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">manufactureYear</th>
                        <th scope="col">Price</th>
                        <th scope="col">Plate Number</th>
                        <th scope="col">Model</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Date Registered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCars.map((car, index)=> {
                            const owner = owners[index]
                            return(
                                <tr key={index}>
                            <th scope="row">{index + 1}</th>
                                <td>{car.chasisNumber}</td>
                                <td>{car.manufacturer}</td>
                                <td>{car.manufactureYear}</td>
                                <td>{car.price}</td>
                                <td>{car.plateNumber}</td>
                                <td>{car.model}</td>
                                <td>{owner ? owner.name : ""}</td>
                                <td>{car.timestamp}</td>
                        </tr>
                            )
                        })}
                    </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default DashboardPage