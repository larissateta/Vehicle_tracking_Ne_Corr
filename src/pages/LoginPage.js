import { Formik } from "formik"
import * as yup from "yup"
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { useState } from "react";
import authApi from "../api/auth";
import authStorage from "../auth/storage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(5)
});

const LoginPage =()=>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin  = async ({
        email,
        password
    })=>{
        setLoading(true);
        const mail = email.toLowerCase();
        const result = await authApi.login(
            email,
            password
        );
        setLoading(false);
        if(!result.ok) return setError(result.data.status || result.data.error);

        authStorage.setToken(result.data.jwt_token);
        navigate("/dashboard")
        
    }
    useEffect(() => {
        if (authStorage.getToken())  navigate('/dashboard');
      }, [navigate]);

    return(
        <div className="container">
            <div className="logo-container">
                <h1>VEHICLE <span style={{color: "black"}}>TRACKER</span></h1>
            </div>
            <div className="sub-container login">
                <h1 style={{marginBottom: 50}}>Log into your account</h1>
                <Formik
                initialValues={{email: "", password: ""}}
                onSubmit={(values)=>handleLogin(values)}
                validationSchema={validationSchema}
                
                
                >
                    {({
                        handleChange,
                        handleSubmit,
                        setFieldTouched,
                        touched,
                        errors
                    })=>(
                    <div className="inputs-container">
                        <div className="row" style={{  marginBottom: 5 }}>
                            {error && <ErrorMessage text={error} />}
                        </div>
                        <div className="row">
                            <label htmlFor="email">Email</label>
                            <input
                            type="text"
                            onChange={handleChange("email")}
                            onBlur={() => setFieldTouched("email")}
                            placeholder="Email"
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
                                />
                                {touched.password && <ErrorMessage text={errors.password}/>}
                            </div>
                        <Button type={"submit"} onClick={handleSubmit} text={loading ? "Loading.....": "Submit"} width={100}/>
                  </div>   
                    )}
                </Formik>
                    <div className="other-links">
                        <p className="header-text" style={{ margin: "20px 0px 20px 0px", fontSize: 13, textAlign: "center"  }}>
                            Don't have an account? <a href="signup">Sign up</a>
                        </p>
                        <p className="header-text" style={{fontSize: 13, textAlign: "center" }}>
                            Forgot your password/login <a href="reset">Reset</a>
                        </p>
                    </div>
            </div>
        </div>
    )
}

export default LoginPage