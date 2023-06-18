import * as yup from "yup"
import Button from "../components/Button"
import { Formik } from "formik"
import { useState } from "react"
import authApi from "../api/auth"
import { useNavigate } from "react-router-dom"
import authStorage from "../auth/storage"
import ErrorMessage from "../components/ErrorMessage"
import logo from "../assets/RRA_Logo_home.png"

const validationSchema = yup.object().shape({
    name: yup.string().required().label("Full Name"),
    phone: yup.string().required().label("Phone"),
    NID: yup.string().required().label("National ID"),
    email: yup.string().required().email().label("Email Address"),
    password: yup.string().required().min(5).label("Password")
})

const SignupPage = ()=>{
    const [loading, isLoading] = useState(false);
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    const handleSignup= async({
        name, 
        phone,
        email,
        NID,
        password,
    })=>{
        const mail = email.toLowerCase();
        isLoading(true);
        const result = await authApi.signup(
            name,
            phone,
            NID,
            email=mail,
            password
        );
        isLoading(false);
        if(!result.ok){
            return setError(result.data.status || result.data.error);
        }
        authStorage.setToken(result.data.jwt_token);
        navigate("/dashboard");
    }
    return(
        <div className="container1">
            <div className="logo-container">
                {/* <h1>VEHICLE <span style={{color: "black"}}>TRACKER</span></h1> */}
                <img src={logo} alt="logo"/>
            </div>
            <div className="sub-container signup">

                <h1>Welcome to vehicle tracker</h1>
                <h4>Create Account</h4>
                <Formik
                initialValues={{name: "", phone: "", email: "", NID:"", password: ""}}
                onSubmit={(values)=> handleSignup(values)}
                validationSchema={validationSchema}
                >
                    {({
                        handleChange,
                        handleSubmit,
                        setFieldTouched,
                        touched,
                        errors
                    })=>(
                        <div className="inputs-container ">
                            <div className="row" style={{  marginBottom: 1}}>
                                {error && <ErrorMessage text={error} />}
                            </div>
                            <div className="row">
                                <label htmlFor="name">Full Name</label>
                                <input
                                type="text"
                                placeholder="Your Name"
                                onChange={handleChange("name")}
                                onBlur={() => setFieldTouched("name")}
                                />
                                {touched.name &&  <ErrorMessage text={errors.name}/>}
                            </div>
                            <div className="row">
                                <label htmlFor="phone">Phone number</label>
                                <input
                                type="text"
                                onChange={handleChange("phone")}
                                onBlur={()=> setFieldTouched("phone")}
                                placeholder="Phone number"                  
                                />
                                {touched.phone && <ErrorMessage text={errors.phone}/>}                                
                            </div>
                            
                            <div className="row">
                                <label htmlFor="NID">National ID</label>
                                <input
                                type="text"
                                onChange={handleChange("NID")}
                                onBlur={() => setFieldTouched("NID")}
                                placeholder="National ID"
                                />
                                {touched.NID && <ErrorMessage text={errors.NID}/>}
                            </div>
                            <div className="row">
                                <label htmlFor="email" >Email</label>
                                <input
                                type="text"
                                onChange={handleChange("email")}
                                onBlur={() => setFieldTouched("email")}
                                placeholder="Email"
                                className="mt-2 mx-1"
                                />
                                {touched.email && <ErrorMessage text={errors.email}/>}
                            </div> 
                            <div className="row">
                                <label htmlFor="password">Password</label>
                                <input
                                type="password"
                                onChange={handleChange("password")}
                                onBlur={() => setFieldTouched("password")}
                                placeholder="Password"
                                // className={touched.password && errors.password ? "error": ""}
                                />
                                {touched.password && <ErrorMessage text={errors.password}/>}
                            </div>
                            <div className="row">
                                <Button type={"submit"} onClick={handleSubmit} text={loading ? "Loading.....": "Submit"} width={100}/>
                            </div>

                        </div>
                    )}
                </Formik>
                <div className="other-links">
                        <p className="header-text" style={{ margin: "13px 0px 20px 0px", fontSize: 13, textAlign: "center" }}>
                            Already have account? <a href="/">Login</a>
                        </p>
                </div>

            </div>
        </div>
    )
}

export default SignupPage